import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
export const getAllInternships = async (req, res, next) => {
  try {
    const { search, tags, techStack, location, page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build filter
    const where = { isActive: true };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      where.tags = { hasSome: tagArray };
    }

    if (techStack) {
      const techArray = techStack.split(',').map(tech => tech.trim());
      where.techStack = { hasSome: techArray };
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    // Get internships with pagination
    const [internships, total] = await Promise.all([
      prisma.internship.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.internship.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        internships,
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

// @desc    Get single internship
// @route   GET /api/internships/:id
// @access  Public
export const getInternshipById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const internship = await prisma.internship.findUnique({
      where: { id }
    });

    if (!internship) {
      throw new AppError('Internship not found', 404);
    }

    res.json({
      success: true,
      data: { internship }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create internship (Admin only - for now public for testing)
// @route   POST /api/internships
// @access  Public
export const createInternship = async (req, res, next) => {
  try {
    const {
      title,
      company,
      description,
      tags,
      techStack,
      location,
      stipend,
      duration,
      applyLink
    } = req.body;

    const internship = await prisma.internship.create({
      data: {
        title,
        company,
        description,
        tags: tags || [],
        techStack: techStack || [],
        location,
        stipend,
        duration,
        applyLink
      }
    });

    res.status(201).json({
      success: true,
      message: 'Internship created successfully',
      data: { internship }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get unique tags and tech stacks
// @route   GET /api/internships/filters/options
// @access  Public
export const getFilterOptions = async (req, res, next) => {
  try {
    const internships = await prisma.internship.findMany({
      where: { isActive: true },
      select: {
        tags: true,
        techStack: true,
        location: true
      }
    });

    const tags = new Set();
    const techStacks = new Set();
    const locations = new Set();

    internships.forEach(internship => {
      internship.tags.forEach(tag => tags.add(tag));
      internship.techStack.forEach(tech => techStacks.add(tech));
      locations.add(internship.location);
    });

    res.json({
      success: true,
      data: {
        tags: Array.from(tags).sort(),
        techStacks: Array.from(techStacks).sort(),
        locations: Array.from(locations).sort()
      }
    });
  } catch (error) {
    next(error);
  }
};

