import express from 'express';
import { getAllTukTuks, getTukTukById, registerTukTuk, updateTukTuk, deactivateTukTuk } from '../controllers/tuktuk.controller.js';
import { sendLocationPing, getLatestLocation, getLocationHistory } from '../controllers/location.controller.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';

const router = express.Router();

router.route('/')
  .get(protect, getAllTukTuks)
  .post(protect, authorize('hq_admin', 'provincial_admin'), registerTukTuk);

router.route('/:id')
  .get(protect, getTukTukById)
  .put(protect, authorize('hq_admin', 'provincial_admin'), updateTukTuk)
  .delete(protect, authorize('hq_admin'), deactivateTukTuk);

router.post('/:id/location', protect, authorize('device'), sendLocationPing);
router.get('/:id/location/latest', protect, getLatestLocation);
router.get('/:id/location/history', protect, getLocationHistory);

export default router;