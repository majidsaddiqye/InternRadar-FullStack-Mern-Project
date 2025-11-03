import { fetchGithubProfile } from '../services/github.service.js';
import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Scan GitHub profile
// @route   POST /api/github/scan
// @access  Private
export const scanGithubProfile = async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username) {
      throw new AppError('GitHub username is required', 400);
    }

    // Fetch GitHub data
    const githubData = await fetchGithubProfile(username);

    // Update user profile with GitHub data
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        githubUsername: username,
        githubData: githubData
      },
      select: {
        id: true,
        name: true,
        email: true,
        skills: true,
        interests: true,
        experience: true,
        githubUsername: true,
        githubData: true
      }
    });

    res.json({
      success: true,
      message: 'GitHub profile scanned successfully',
      data: {
        user,
        githubData
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get GitHub profile data
// @route   GET /api/github/profile/:username
// @access  Public
export const getGithubProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const githubData = await fetchGithubProfile(username);

    res.json({
      success: true,
      data: { githubData }
    });
  } catch (error) {
    next(error);
  }
};

