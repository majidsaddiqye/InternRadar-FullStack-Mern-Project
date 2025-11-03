import { normalizeGithubDataForAI } from './github.service.js';

/**
 * Calculate similarity score between user profile and internship
 * Uses weighted scoring based on skills, interests, and GitHub data
 */
export const calculateSimilarityScore = (userProfile, internship, githubData = null) => {
  let totalScore = 0;
  let maxScore = 0;
  const breakdown = {};

  // 1. Skills matching (40% weight)
  const skillsWeight = 40;
  const userSkills = (userProfile.skills || []).map(s => s.toLowerCase());
  const internshipTech = (internship.techStack || []).map(t => t.toLowerCase());
  
  if (userSkills.length > 0 && internshipTech.length > 0) {
    const matchingSkills = userSkills.filter(skill => 
      internshipTech.some(tech => 
        tech.includes(skill) || skill.includes(tech)
      )
    );
    const skillScore = (matchingSkills.length / internshipTech.length) * skillsWeight;
    totalScore += skillScore;
    breakdown.skillsScore = skillScore;
    breakdown.matchingSkills = matchingSkills;
  }
  maxScore += skillsWeight;

  // 2. Interests matching (25% weight)
  const interestsWeight = 25;
  const userInterests = (userProfile.interests || []).map(i => i.toLowerCase());
  const internshipTags = (internship.tags || []).map(t => t.toLowerCase());
  
  if (userInterests.length > 0 && internshipTags.length > 0) {
    const matchingInterests = userInterests.filter(interest =>
      internshipTags.some(tag => 
        tag.includes(interest) || interest.includes(tag)
      )
    );
    const interestScore = (matchingInterests.length / Math.max(userInterests.length, internshipTags.length)) * interestsWeight;
    totalScore += interestScore;
    breakdown.interestsScore = interestScore;
    breakdown.matchingInterests = matchingInterests;
  }
  maxScore += interestsWeight;

  // 3. GitHub tech stack matching (25% weight)
  const githubWeight = 25;
  if (githubData && githubData.techStack) {
    const githubTech = githubData.techStack.map(t => t.toLowerCase());
    const matchingGithubTech = githubTech.filter(tech =>
      internshipTech.some(iTech => 
        iTech.includes(tech) || tech.includes(iTech)
      )
    );
    const githubScore = (matchingGithubTech.length / internshipTech.length) * githubWeight;
    totalScore += githubScore;
    breakdown.githubScore = githubScore;
    breakdown.matchingGithubTech = matchingGithubTech;
  }
  maxScore += githubWeight;

  // 4. Experience level matching (10% weight)
  const experienceWeight = 10;
  const experienceMatch = matchExperienceLevel(userProfile.experience, internship);
  totalScore += experienceMatch * experienceWeight;
  breakdown.experienceScore = experienceMatch * experienceWeight;
  maxScore += experienceWeight;

  // Calculate final percentage score
  const finalScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  return {
    score: Math.round(finalScore * 100) / 100, // Round to 2 decimal places
    breakdown,
    explanation: generateExplanation(breakdown, finalScore)
  };
};

/**
 * Match experience level with internship requirements
 */
const matchExperienceLevel = (userExperience, internship) => {
  // Simple heuristic: check if internship description mentions experience level
  const description = internship.description.toLowerCase();
  const experience = (userExperience || 'beginner').toLowerCase();

  if (description.includes(experience)) return 1;
  if (experience === 'beginner' && description.includes('entry')) return 0.8;
  if (experience === 'intermediate' && description.includes('experience')) return 0.8;
  if (experience === 'advanced' && description.includes('senior')) return 0.8;
  
  return 0.5; // Neutral score if no clear match
};

/**
 * Generate human-readable explanation for the score
 */
const generateExplanation = (breakdown, finalScore) => {
  const reasons = [];

  if (breakdown.matchingSkills && breakdown.matchingSkills.length > 0) {
    reasons.push(`Matches ${breakdown.matchingSkills.length} of your skills: ${breakdown.matchingSkills.join(', ')}`);
  }

  if (breakdown.matchingInterests && breakdown.matchingInterests.length > 0) {
    reasons.push(`Aligns with your interests in ${breakdown.matchingInterests.join(', ')}`);
  }

  if (breakdown.matchingGithubTech && breakdown.matchingGithubTech.length > 0) {
    reasons.push(`Your GitHub shows experience with ${breakdown.matchingGithubTech.join(', ')}`);
  }

  if (finalScore >= 70) {
    return `Excellent match! ${reasons.join('. ')}.`;
  } else if (finalScore >= 50) {
    return `Good match. ${reasons.join('. ')}.`;
  } else if (finalScore >= 30) {
    return `Moderate match. ${reasons.join('. ')}.`;
  } else {
    return reasons.length > 0 
      ? `Limited match. ${reasons.join('. ')}.`
      : 'This internship may help you explore new areas.';
  }
};

/**
 * Get personalized internship recommendations
 */
export const getRecommendations = async (userProfile, internships, options = {}) => {
  const {
    limit = 10,
    minScore = 0,
    includeGithubData = true
  } = options;

  // Get GitHub data if available
  const githubData = includeGithubData && userProfile.githubData 
    ? normalizeGithubDataForAI(userProfile.githubData)
    : null;

  // Calculate scores for all internships
  const scoredInternships = internships.map(internship => {
    const scoreData = calculateSimilarityScore(userProfile, internship, githubData);
    
    return {
      internship,
      score: scoreData.score,
      breakdown: scoreData.breakdown,
      explanation: scoreData.explanation
    };
  });

  // Filter by minimum score and sort by score (descending)
  const recommendations = scoredInternships
    .filter(item => item.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return recommendations;
};

/**
 * Get recommendations with diversity (not just top scores)
 */
export const getDiverseRecommendations = async (userProfile, internships, options = {}) => {
  const { limit = 10 } = options;

  // Get all recommendations
  const allRecommendations = await getRecommendations(userProfile, internships, {
    ...options,
    limit: internships.length
  });

  // Take top 60% based on score
  const topCount = Math.ceil(limit * 0.6);
  const topRecommendations = allRecommendations.slice(0, topCount);

  // Take remaining 40% from different companies/domains for diversity
  const remainingCount = limit - topCount;
  const usedCompanies = new Set(topRecommendations.map(r => r.internship.company));
  
  const diverseRecommendations = allRecommendations
    .slice(topCount)
    .filter(r => !usedCompanies.has(r.internship.company))
    .slice(0, remainingCount);

  return [...topRecommendations, ...diverseRecommendations];
};

