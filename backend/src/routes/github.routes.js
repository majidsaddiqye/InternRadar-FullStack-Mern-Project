import express from 'express';
import { body } from 'express-validator';
import { scanGithubProfile, getGithubProfile } from '../controllers/github.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const scanValidation = [
  body('username').trim().notEmpty().withMessage('GitHub username is required')
];

// Routes
router.post('/scan', protect, scanValidation, validate, scanGithubProfile);
router.get('/profile/:username', getGithubProfile);

export default router;

