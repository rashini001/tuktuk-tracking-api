import Province from '../models/Province.js';
import District from '../models/District.js';

// GET /api/provinces
export const getAllProvinces = async (req, res, next) => {
  try {
    const provinces = await Province.find();
    res.json({
      success: true,
      count: provinces.length,
      data: provinces
    });
  } catch (err) { next(err); }
};

// GET /api/provinces/:id
export const getProvinceById = async (req, res, next) => {
  try {
    const province = await Province.findById(req.params.id);

    if (!province)
      return res.status(404).json({ success: false, message: 'Province not found' });

    res.json({ success: true, data: province });
  } catch (err) { next(err); }
};

// POST /api/provinces
export const createProvince = async (req, res, next) => {
  try {
    const province = await Province.create(req.body);
    res.status(201).json({ success: true, data: province });
  } catch (err) { next(err); }
};

// PUT /api/provinces/:id
export const updateProvince = async (req, res, next) => {
  try {
    const province = await Province.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!province)
      return res.status(404).json({ success: false, message: 'Province not found' });

    res.json({ success: true, data: province });
  } catch (err) { next(err); }
};

// DELETE /api/provinces/:id
export const deleteProvince = async (req, res, next) => {
  try {
    const province = await Province.findByIdAndDelete(req.params.id);

    if (!province)
      return res.status(404).json({ success: false, message: 'Province not found' });

    res.json({ success: true, message: 'Province deleted successfully' });
  } catch (err) { next(err); }
};

// GET /api/provinces/:id/districts
export const getDistrictsByProvince = async (req, res, next) => {
  try {
    const province = await Province.findById(req.params.id);

    if (!province)
      return res.status(404).json({ success: false, message: 'Province not found' });

    const districts = await District.find({ province: req.params.id })
      .populate('province', 'name code');

    res.json({
      success: true,
      count: districts.length,
      data: districts
    });
  } catch (err) { next(err); }
};