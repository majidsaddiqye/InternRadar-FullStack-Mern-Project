import express from 'express';
import { body } from 'express-validator';
import { updateProfile, getProfile, updateGithubData } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Validation rules
const updateProfileValidation = [
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('interests').optional().isArray().withMessage('Interests must be an array'),
  body('experience')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Experience must be beginner, intermediate, or advanced')
];

// Routes
router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, validate, updateProfile);
router.put('/github-data', updateGithubData);

export default router;

