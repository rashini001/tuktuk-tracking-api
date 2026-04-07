import express from 'express';
import { login, register, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', protect, authorize('hq_admin'), register);
router.get('/me', protect, getMe);

export default router;