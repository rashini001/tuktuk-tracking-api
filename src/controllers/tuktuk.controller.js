import TukTuk from '../models/TukTuk.js';

// GET /api/tuktuk
export const getAllTukTuks = async (req, res, next) => {
  try {
    const { district, province, isActive, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (district) filter.homeDistrict = district;
    if (province) filter.homeProvince = province;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const total = await TukTuk.countDocuments(filter);
    const tuktuk = await TukTuk.find(filter)
      .populate('homeDistrict', 'name')
      .populate('homeProvince', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, page: Number(page), results: tuktuk });
  } catch (err) { next(err); }
};

// GET /api/tuktuk/:id
export const getTukTukById = async (req, res, next) => {
  try {
    const tuktuk = await TukTuk.findById(req.params.id)
      .populate('homeDistrict homeProvince');
    if (!tuktuk) return res.status(404).json({ success: false, message: 'TukTuk not found' });
    res.json({ success: true, data: tuktuk });
  } catch (err) { next(err); }
};

// POST /api/tuktuk
export const registerTukTuk = async (req, res, next) => {
  try {
    const tuktuk = await TukTuk.create(req.body);
    res.status(201).json({ success: true, data: tuktuk });
  } catch (err) { next(err); }
};

// PUT /api/tuktuk/:id
export const updateTukTuk = async (req, res, next) => {
  try {
    const tuktuk = await TukTuk.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tuktuk) return res.status(404).json({ success: false, message: 'TukTuk not found' });
    res.json({ success: true, data: tuktuk });
  } catch (err) { next(err); }
};

// DELETE /api/tuktuk/:id
export const deactivateTukTuk = async (req, res, next) => {
  try {
    const tuktuk = await TukTuk.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!tuktuk) return res.status(404).json({ success: false, message: 'TukTuk not found' });
    res.json({ success: true, message: 'TukTuk deactivated' });
  } catch (err) { next(err); }
};