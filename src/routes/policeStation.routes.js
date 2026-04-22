import express from 'express';
import {
  getAllStations,
  createStation,
  getStationById,
  updateStation,
  deleteStation
} from '../controllers/station.controller.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';

const router = express.Router();

/**
 * @swagger
 * /api/police-stations:
 *   get:
 *     summary: Get all police stations
 *     tags: [Police Stations]
 *     parameters:
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *         description: Filter by district ID
 *       - in: query
 *         name: province
 *         schema:
 *           type: string
 *         description: Filter by province ID
 *     responses:
 *       200:
 *         description: List of police stations
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getAllStations);

/**
 * @swagger
 * /api/police-stations:
 *   post:
 *     summary: Create a new police station
 *     tags: [Police Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               stationCode:
 *                 type: string
 *               district:
 *                 type: string
 *               province:
 *                 type: string
 *               address:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Police station created
 *       403:
 *         description: Not authorized
 */
router.post('/', protect, authorize('hq_admin'), createStation);

/**
 * @swagger
 * /api/police-stations/{id}:
 *   get:
 *     summary: Get a single police station by ID
 *     tags: [Police Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Police station found
 *       404:
 *         description: Station not found
 */
router.get('/:id', protect, getStationById);

/**
 * @swagger
 * /api/police-stations/{id}:
 *   put:
 *     summary: Update a police station
 *     tags: [Police Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Station updated
 *       404:
 *         description: Station not found
 */
router.put('/:id', protect, authorize('hq_admin'), updateStation);

/**
 * @swagger
 * /api/police-stations/{id}:
 *   delete:
 *     summary: Delete a police station
 *     tags: [Police Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Station deleted
 *       404:
 *         description: Station not found
 */
router.delete('/:id', protect, authorize('hq_admin'), deleteStation);

export default router;