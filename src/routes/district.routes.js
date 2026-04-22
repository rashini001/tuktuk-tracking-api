import express from 'express';
import {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict
} from '../controllers/district.controller.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';

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
 *         description: Filter by province ID
 *     responses:
 *       200:
 *         description: List of all 25 districts
 */
router.get('/', protect, getAllDistricts);

/**
 * @swagger
 * /api/districts:
 *   post:
 *     summary: Create a new district
 *     tags: [Districts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               province:
 *                 type: string
 *     responses:
 *       201:
 *         description: District created
 */
router.post('/', protect, authorize('hq_admin'), createDistrict);

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

/**
 * @swagger
 * /api/districts/{id}:
 *   put:
 *     summary: Update a district
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: District updated
 */
router.put('/:id', protect, authorize('hq_admin'), updateDistrict);

/**
 * @swagger
 * /api/districts/{id}:
 *   delete:
 *     summary: Delete a district
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: District deleted
 */
router.delete('/:id', protect, authorize('hq_admin'), deleteDistrict);

export default router;