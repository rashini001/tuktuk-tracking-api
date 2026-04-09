import LocationPing from '../models/LocationPing.js';
import TukTuk from '../models/TukTuk.js';

// POST /api/tuktuk/:id/location  (device sends ping)
export const sendLocationPing = async (req, res, next) => {
  try {
    const tuktuk = await TukTuk.findById(req.params.id);
    if (!tuktuk) return res.status(404).json({ success: false, message: 'TukTuk not found' });

    const { latitude, longitude, speed, heading, province, district } = req.body;

    const ping = await LocationPing.create({
      tukTuk: tuktuk._id,
      latitude, longitude, speed, heading, province, district,
      timestamp: new Date()
    });

    // Update last known location on the vehicle doc
    await TukTuk.findByIdAndUpdate(req.params.id, {
      lastKnownLocation: { latitude, longitude, timestamp: ping.timestamp }
    });

    res.status(201).json({ success: true, data: ping });
  } catch (err) { next(err); }
};

// GET /api/tuktuk/:id/location/latest
export const getLatestLocation = async (req, res, next) => {
  try {
    const ping = await LocationPing.findOne({ tukTuk: req.params.id })
      .sort({ timestamp: -1 })
      .populate('province district');
    if (!ping) return res.status(404).json({ success: false, message: 'No location data found' });
    res.json({ success: true, data: ping });
  } catch (err) { next(err); }
};

// GET /api/tuktuk/:id/location/history?from=&to=&limit=100
export const getLocationHistory = async (req, res, next) => {
  try {
    const { from, to, limit = 100 } = req.query;
    const filter = { tukTuk: req.params.id };
    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }

    const history = await LocationPing.find(filter)
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .populate('province district');

    res.json({ success: true, count: history.length, data: history });
  } catch (err) { next(err); }
};

// GET /api/locations/live?province=&district=
export const getLiveLocations = async (req, res, next) => {
  try {
    const { province, district } = req.query;
    const since = new Date(Date.now() - 15 * 60 * 1000); // last 15 mins

    const filter = { timestamp: { $gte: since } };
    if (province) filter.province = province;
    if (district) filter.district = district;

    const pings = await LocationPing.find(filter)
      .sort({ timestamp: -1 })
      .populate('tukTuk', 'registrationNumber ownerName')
      .populate('province district');

    res.json({ success: true, count: pings.length, data: pings });
  } catch (err) { next(err); }
};