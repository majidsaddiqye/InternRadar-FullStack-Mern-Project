import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, skills, interests, experience, githubUsername } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (skills) updateData.skills = skills;
    if (interests) updateData.interests = interests;
    if (experience) updateData.experience = experience;
    if (githubUsername !== undefined) updateData.githubUsername = githubUsername;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        skills: true,
        interests: true,
        experience: true,
        githubUsername: true,
        githubData: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        skills: true,
        interests: true,
        experience: true,
        githubUsername: true,
        githubData: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update GitHub data
// @route   PUT /api/users/github-data
// @access  Private
export const updateGithubData = async (req, res, next) => {
  try {
    const { githubData } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { githubData },
      select: {
        id: true,
        name: true,
        email: true,
        skills: true,
        interests: true,
        experience: true,
        githubUsername: true,
        githubData: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'GitHub data updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

