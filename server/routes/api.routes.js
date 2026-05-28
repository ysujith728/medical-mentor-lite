import express from 'express';
import { defineTerm, getRelatedTerms, generateQuiz, getGraph } from '../controllers/gemini.controller.js';
import { getProfile, getActivities, getSavedTerms } from '../controllers/dashboard.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public / AI Routes
router.post('/define', aiLimiter, defineTerm);
router.post('/related', aiLimiter, getRelatedTerms);
router.post('/quiz', aiLimiter, generateQuiz);
router.post('/graph', aiLimiter, getGraph);

// Protected Dashboard Routes
router.get('/dashboard/profile', requireAuth, getProfile);
router.get('/dashboard/activities', requireAuth, getActivities);
router.get('/dashboard/terms', requireAuth, getSavedTerms);

export default router;
