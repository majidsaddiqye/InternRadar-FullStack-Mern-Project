import express from 'express';
import { body } from 'express-validator';
import {
  getAllInternships,
  getInternshipById,
  createInternship,
  getFilterOptions
} from '../controllers/internship.controller.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const createInternshipValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('techStack').optional().isArray().withMessage('Tech stack must be an array')
];

// Routes
router.get('/', getAllInternships);
router.get('/filters/options', getFilterOptions);
router.get('/:id', getInternshipById);
router.post('/', createInternshipValidation, validate, createInternship);

export default router;

