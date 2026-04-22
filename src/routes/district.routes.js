import express from 'express';
<<<<<<< Updated upstream
import { getLiveLocations } from '../controllers/district.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/live', protect, getLiveLocations);
=======
import {
  getAllDistricts,
  getDistrictById
} from '../controllers/district.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/districts:
 *   get:
 *     summary: Get all districts
 *     tags: [Districts]
 *     parameters:
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: Filter districts by province ID
 *     responses:
 *       200:
 *         description: List of all 25 districts
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getAllDistricts);

/**
 * @swagger
 * /api/districts/{id}:
 *   get:
 *     summary: Get a single district by ID
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: District found
 *       404:
 *         description: District not found
 */
router.get('/:id', protect, getDistrictById);
>>>>>>> Stashed changes

export default router;