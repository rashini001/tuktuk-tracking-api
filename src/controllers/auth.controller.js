import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ success: false, message: 'Username and password required' });

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) { next(err); }
};

// POST /api/auth/register (hq_admin only)
export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) { next(err); }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};