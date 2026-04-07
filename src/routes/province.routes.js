import express from 'express';
import { getLiveLocations } from '../controllers/province.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/live', protect, getLiveLocations);

export default router;