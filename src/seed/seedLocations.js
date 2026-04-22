import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TukTuk from '../models/TukTuk.js';
import LocationPing from '../models/LocationPing.js';
import District from '../models/District.js';
import Province from '../models/Province.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB Connected');

// Sri Lanka bounding box
const randLat = () => parseFloat((5.9 + Math.random() * 4).toFixed(6));
const randLng = () => parseFloat((79.6 + Math.random() * 2.3).toFixed(6));

const tuktuk = await TukTuk.find({ isActive: true })
  .populate('homeDistrict')
  .populate('homeProvince');

await LocationPing.deleteMany();
console.log('Old location pings deleted');

const pings = [];
const now = new Date();
const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

for (const t of tuktuk) {
  for (let i = 0; i < 50; i++) {
    const ts = new Date(
      oneWeekAgo.getTime() + Math.random() * (now - oneWeekAgo)
    );
    pings.push({
      tukTuk: t._id,
      latitude: randLat(),
      longitude: randLng(),
      speed: Math.floor(Math.random() * 60),
      heading: Math.floor(Math.random() * 360),
      timestamp: ts,
      province: t.homeProvince._id,
      district: t.homeDistrict._id
    });
  }
}

await LocationPing.insertMany(pings);
console.log(`${pings.length} location pings seeded (7 days history)`);

await mongoose.connection.close();
console.log('Done!');