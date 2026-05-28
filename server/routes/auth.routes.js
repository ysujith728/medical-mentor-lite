import express from 'express';
import { promoteToAdmin } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/promote-admin', requireAuth, promoteToAdmin);

export default router;
