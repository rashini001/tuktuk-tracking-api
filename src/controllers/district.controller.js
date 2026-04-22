import District from '../models/District.js';

// GET /api/districts
export const getAllDistricts = async (req, res, next) => {
  try {
    const { province } = req.query;
    const filter = {};
    if (province) filter.province = province;

    const districts = await District.find(filter)
      .populate('province', 'name code');

    res.json({
      success: true,
      count: districts.length,
      data: districts
    });
  } catch (err) { next(err); }
};

// GET /api/districts/:id
export const getDistrictById = async (req, res, next) => {
  try {
    const district = await District.findById(req.params.id)
      .populate('province', 'name code');

    if (!district)
      return res.status(404).json({ success: false, message: 'District not found' });

    res.json({ success: true, data: district });
  } catch (err) { next(err); }
};

// POST /api/districts
export const createDistrict = async (req, res, next) => {
  try {
    const district = await District.create(req.body);
    res.status(201).json({ success: true, data: district });
  } catch (err) { next(err); }
};

// PUT /api/districts/:id
export const updateDistrict = async (req, res, next) => {
  try {
    const district = await District.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!district)
      return res.status(404).json({ success: false, message: 'District not found' });

    res.json({ success: true, data: district });
  } catch (err) { next(err); }
};

// DELETE /api/districts/:id
export const deleteDistrict = async (req, res, next) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);

    if (!district)
      return res.status(404).json({ success: false, message: 'District not found' });

    res.json({ success: true, message: 'District deleted successfully' });
  } catch (err) { next(err); }
};