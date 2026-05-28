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

// Protected Dashboard Routes (Auth bypassed for simulation)
router.get('/dashboard/profile', getProfile);
router.get('/dashboard/activities', getActivities);
router.get('/dashboard/terms', getSavedTerms);

export default router;
