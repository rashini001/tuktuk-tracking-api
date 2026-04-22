import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB Connected');

await User.deleteMany();

const admin = await User.create({
  name: 'HQ Admin',
  username: 'admin',
  password: 'admin123',
  role: 'hq_admin',
  isActive: true
});

console.log('Admin user created ✅');
console.log('Username: admin');
console.log('Password: admin123');

await mongoose.connection.close();
console.log('Done!');