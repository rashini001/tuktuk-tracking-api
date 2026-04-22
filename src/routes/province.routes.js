import express from 'express';
<<<<<<< Updated upstream
import { getLiveLocations } from '../controllers/province.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/live', protect, getLiveLocations);
=======
import {
  getAllProvinces,
  getProvinceById,
  getDistrictsByProvince
} from '../controllers/province.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/provinces:
 *   get:
 *     summary: Get all provinces
 *     tags: [Provinces]
 *     responses:
 *       200:
 *         description: List of all 9 provinces
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getAllProvinces);

/**
 * @swagger
 * /api/provinces/{id}:
 *   get:
 *     summary: Get a single province by ID
 *     tags: [Provinces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Province found
 *       404:
 *         description: Province not found
 */
router.get('/:id', protect, getProvinceById);

/**
 * @swagger
 * /api/provinces/{id}/districts:
 *   get:
 *     summary: Get all districts in a province
 *     tags: [Provinces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of districts in the province
 *       404:
 *         description: Province not found
 */
router.get('/:id/districts', protect, getDistrictsByProvince);
>>>>>>> Stashed changes

export default router;