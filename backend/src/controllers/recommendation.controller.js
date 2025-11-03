import prisma from '../config/database.js';
import { getRecommendations, getDiverseRecommendations } from '../services/recommendation.service.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Get personalized recommendations
// @route   GET /api/recommendations
// @access  Private
export const getPersonalizedRecommendations = async (req, res, next) => {
  try {
    const { limit = 10, minScore = 0, diverse = false } = req.query;

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if user has completed profile
    if (!user.skills || user.skills.length === 0) {
      return res.json({
        success: true,
        message: 'Please complete your profile to get personalized recommendations',
        data: {
          recommendations: [],
          profileComplete: false
        }
      });
    }

    // Get all active internships
    const internships = await prisma.internship.findMany({
      where: { isActive: true }
    });

    if (internships.length === 0) {
      return res.json({
        success: true,
        message: 'No internships available at the moment',
        data: {
          recommendations: [],
          profileComplete: true
        }
      });
    }

    // Get recommendations
    const recommendationFn = diverse === 'true' ? getDiverseRecommendations : getRecommendations;
    const recommendations = await recommendationFn(user, internships, {
      limit: parseInt(limit),
      minScore: parseFloat(minScore)
    });

    // Log recommendations
    await prisma.recommendationLog.create({
      data: {
        userId: user.id,
        recommendedInternships: recommendations.map(r => ({
          internshipId: r.internship.id,
          score: r.score,
          explanation: r.explanation
        }))
      }
    });

    res.json({
      success: true,
      data: {
        recommendations,
        profileComplete: true,
        totalFound: recommendations.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recommendation history
// @route   GET /api/recommendations/history
// @access  Private
export const getRecommendationHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [logs, total] = await Promise.all([
      prisma.recommendationLog.findMany({
        where: { userId: req.user.id },
        skip,
        take,
        orderBy: { timestamp: 'desc' }
      }),
      prisma.recommendationLog.count({
        where: { userId: req.user.id }
      })
    ]);

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

