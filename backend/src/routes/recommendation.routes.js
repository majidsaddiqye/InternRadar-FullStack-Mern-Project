import express from 'express';
import {
  getPersonalizedRecommendations,
  getRecommendationHistory
} from '../controllers/recommendation.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/', getPersonalizedRecommendations);
router.get('/history', getRecommendationHistory);

export default router;

