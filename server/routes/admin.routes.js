import express from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js';
import { getOverviewMetrics, getUsers, getAiAnalytics, getSearchAnalytics } from '../controllers/admin.controller.js';

const router = express.Router();

// All routes require authentication AND admin privileges
router.use(requireAuth, requireAdmin);

router.get('/overview', getOverviewMetrics);
router.get('/users', getUsers);
router.get('/ai-analytics', getAiAnalytics);
router.get('/search-analytics', getSearchAnalytics);

export default router;
