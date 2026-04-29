import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import Province from '../models/Province.js';
import District from '../models/District.js';
import PoliceStation from '../models/PoliceStation.js';
import TukTuk from '../models/TukTuk.js';
import LocationPing from '../models/LocationPing.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB Connected');

// Export Provinces
const provinces = await Province.find();
fs.writeFileSync('./simulation-data/provinces.json',
  JSON.stringify(provinces, null, 2));
console.log(`Exported ${provinces.length} provinces`);

// Export Districts
const districts = await District.find().populate('province', 'name');
fs.writeFileSync('./simulation-data/districts.json',
  JSON.stringify(districts, null, 2));
console.log(`Exported ${districts.length} districts`);

// Export Police Stations
const stations = await PoliceStation.find()
  .populate('province', 'name')
  .populate('district', 'name');
fs.writeFileSync('./simulation-data/policeStations.json',
  JSON.stringify(stations, null, 2));
console.log(`Exported ${stations.length} police stations`);

// Export TukTuks
const tuktuk = await TukTuk.find()
  .populate('homeProvince', 'name')
  .populate('homeDistrict', 'name');
fs.writeFileSync('./simulation-data/tuktuks.json',
  JSON.stringify(tuktuk, null, 2));
console.log(`Exported ${tuktuk.length} tuktuks`);

// Export Location Pings (latest 1000 only - file size limit)
const pings = await LocationPing.find()
  .sort({ timestamp: -1 })
  .limit(1000)
  .populate('tukTuk', 'registrationNumber')
  .populate('province', 'name')
  .populate('district', 'name');
fs.writeFileSync('./simulation-data/locationPings.json',
  JSON.stringify(pings, null, 2));
console.log(`Exported ${pings.length} location pings`);

await mongoose.connection.close();
console.log('All data exported successfully!');