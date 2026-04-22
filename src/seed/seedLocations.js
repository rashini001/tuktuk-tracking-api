import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TukTuk from '../models/TukTuk.js';
import LocationPing from '../models/LocationPing.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

// Sri Lanka bounding box approx: lat 5.9-9.9, lng 79.6-81.9
const randLat = () => 5.9 + Math.random() * 4;
const randLng = () => 79.6 + Math.random() * 2.3;

const tuktuk = await TukTuk.find({ isActive: true }).populate('homeDistrict homeProvince');
await LocationPing.deleteMany();

const pings = [];
const now = new Date();
const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

for (const t of tuktuk) {
  // Each tuk-tuk gets ~50 pings spread over past 7 days
  for (let i = 0; i < 50; i++) {
    const ts = new Date(oneWeekAgo.getTime() + Math.random() * (now - oneWeekAgo));
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
mongoose.connection.close();