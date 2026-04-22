import express from 'express';
import {
  getAllProvinces,
  getProvinceById,
  createProvince,
  updateProvince,
  deleteProvince,
  getDistrictsByProvince
} from '../controllers/province.controller.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';

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
 */
router.get('/', protect, getAllProvinces);

/**
 * @swagger
 * /api/provinces:
 *   post:
 *     summary: Create a new province
 *     tags: [Provinces]
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
 *     responses:
 *       201:
 *         description: Province created
 */
router.post('/', protect, authorize('hq_admin'), createProvince);

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
 * /api/provinces/{id}:
 *   put:
 *     summary: Update a province
 *     tags: [Provinces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Province updated
 */
router.put('/:id', protect, authorize('hq_admin'), updateProvince);

/**
 * @swagger
 * /api/provinces/{id}:
 *   delete:
 *     summary: Delete a province
 *     tags: [Provinces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Province deleted
 */
router.delete('/:id', protect, authorize('hq_admin'), deleteProvince);

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
 *         description: List of districts
 */
router.get('/:id/districts', protect, getDistrictsByProvince);

export default router;