import axios from 'axios';
import { AppError } from '../middleware/errorHandler.js';

const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with optional auth
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(process.env.GITHUB_TOKEN && {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    })
  }
});

// Handle rate limiting
githubApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403 && error.response?.headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(error.response.headers['x-ratelimit-reset'] * 1000);
      throw new AppError(
        `GitHub API rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`,
        429
      );
    }
    throw error;
  }
);

export const fetchGithubProfile = async (username) => {
  try {
    // Fetch user profile
    const { data: user } = await githubApi.get(`/users/${username}`);

    // Fetch repositories
    const { data: repos } = await githubApi.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100
      }
    });

    // Process repositories to extract tech stack
    const languageStats = {};
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    // Sort languages by frequency
    const topLanguages = Object.entries(languageStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([language, count]) => ({
        language,
        count,
        percentage: ((count / repos.length) * 100).toFixed(1)
      }));

    // Extract tech stack (languages used)
    const techStack = topLanguages.map(item => item.language);

    // Get recent activity (commits in last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentRepos = repos.filter(repo => 
      new Date(repo.updated_at) > sixMonthsAgo
    );

    // Build summary
    const summary = {
      username: user.login,
      name: user.name,
      bio: user.bio,
      location: user.location,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      createdAt: user.created_at,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      
      // Repository stats
      totalStars,
      totalForks,
      
      // Languages and tech stack
      topLanguages,
      techStack,
      
      // Activity
      recentReposCount: recentRepos.length,
      
      // Top repositories
      topRepos: repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url
        }))
    };

    return summary;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError('GitHub user not found', 404);
    }
    
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      `Failed to fetch GitHub profile: ${error.message}`,
      500
    );
  }
};

export const normalizeGithubDataForAI = (githubData) => {
  if (!githubData) return null;

  return {
    skills: githubData.techStack || [],
    experience: determineExperienceLevel(githubData),
    domains: inferDomains(githubData),
    activityLevel: calculateActivityLevel(githubData)
  };
};

// Helper: Determine experience level based on GitHub activity
const determineExperienceLevel = (githubData) => {
  const { publicRepos, totalStars, followers } = githubData;
  
  const score = publicRepos * 1 + totalStars * 2 + followers * 0.5;
  
  if (score > 100) return 'advanced';
  if (score > 30) return 'intermediate';
  return 'beginner';
};

// Helper: Infer domains from languages and repo names
const inferDomains = (githubData) => {
  const domains = new Set();
  const languages = githubData.techStack || [];
  
  // Map languages to domains
  const languageDomainMap = {
    'JavaScript': 'web-development',
    'TypeScript': 'web-development',
    'Python': 'backend',
    'Java': 'backend',
    'C++': 'systems-programming',
    'C#': 'game-development',
    'Go': 'backend',
    'Rust': 'systems-programming',
    'Swift': 'mobile',
    'Kotlin': 'mobile',
    'PHP': 'web-development',
    'Ruby': 'web-development',
    'HTML': 'frontend',
    'CSS': 'frontend'
  };
  
  languages.forEach(lang => {
    if (languageDomainMap[lang]) {
      domains.add(languageDomainMap[lang]);
    }
  });
  
  return Array.from(domains);
};

// Helper: Calculate activity level
const calculateActivityLevel = (githubData) => {
  const { recentReposCount, publicRepos } = githubData;
  
  if (publicRepos === 0) return 'inactive';
  
  const activityRatio = recentReposCount / publicRepos;
  
  if (activityRatio > 0.5) return 'high';
  if (activityRatio > 0.2) return 'medium';
  return 'low';
};

