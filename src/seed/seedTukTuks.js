import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TukTuk from '../models/TukTuk.js';
import District from '../models/District.js';
import Province from '../models/Province.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const districts = await District.find().populate('province');
await TukTuk.deleteMany();

const tuktuks = [];
for (let i = 1; i <= 200; i++) {
  const d = districts[Math.floor(Math.random() * districts.length)];
  tuktuks.push({
    registrationNumber: `TK-${String(i).padStart(4, '0')}`,
    ownerName: `Owner ${i}`,
    ownerNIC: `${900000000 + i}V`,
    ownerContact: `07${Math.floor(10000000 + Math.random() * 89999999)}`,
    deviceId: `DEVICE-${String(i).padStart(4, '0')}`,
    homeDistrict: d._id,
    homeProvince: d.province._id,
    isActive: true
  });
}

await TukTuk.insertMany(tuktuks);
console.log('200 TukTuks seeded');
mongoose.connection.close();