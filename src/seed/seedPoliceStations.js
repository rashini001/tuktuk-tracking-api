import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PoliceStation from '../models/PoliceStation.js';
import District from '../models/District.js';
import Province from '../models/Province.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB Connected');

const districts = await District.find().populate('province');

await PoliceStation.deleteMany();

const stations = [
  { name: 'Colombo Fort Police Station', stationCode: 'COL001' },
  { name: 'Maradana Police Station', stationCode: 'COL002' },
  { name: 'Nugegoda Police Station', stationCode: 'COL003' },
  { name: 'Gampaha Police Station', stationCode: 'GAM001' },
  { name: 'Negombo Police Station', stationCode: 'GAM002' },
  { name: 'Kalutara Police Station', stationCode: 'KAL001' },
  { name: 'Panadura Police Station', stationCode: 'KAL002' },
  { name: 'Kandy Police Station', stationCode: 'KAN001' },
  { name: 'Peradeniya Police Station', stationCode: 'KAN002' },
  { name: 'Matale Police Station', stationCode: 'MAT001' },
  { name: 'Nuwara Eliya Police Station', stationCode: 'NUW001' },
  { name: 'Galle Police Station', stationCode: 'GAL001' },
  { name: 'Hikkaduwa Police Station', stationCode: 'GAL002' },
  { name: 'Matara Police Station', stationCode: 'MTA001' },
  { name: 'Hambantota Police Station', stationCode: 'HAM001' },
  { name: 'Jaffna Police Station', stationCode: 'JAF001' },
  { name: 'Vavuniya Police Station', stationCode: 'VAV001' },
  { name: 'Trincomalee Police Station', stationCode: 'TRI001' },
  { name: 'Batticaloa Police Station', stationCode: 'BAT001' },
  { name: 'Ampara Police Station', stationCode: 'AMP001' },
  { name: 'Kurunegala Police Station', stationCode: 'KUR001' },
  { name: 'Anuradhapura Police Station', stationCode: 'ANU001' },
  { name: 'Polonnaruwa Police Station', stationCode: 'POL001' },
  { name: 'Badulla Police Station', stationCode: 'BAD001' },
  { name: 'Ratnapura Police Station', stationCode: 'RAT001' }
];

const stationsToInsert = stations.map((s, index) => {
  const district = districts[index % districts.length];
  return {
    name: s.name,
    stationCode: s.stationCode,
    district: district._id,
    province: district.province._id,
    address: `${s.name} Address, Sri Lanka`,
    contactNumber: `0${Math.floor(110000000 + Math.random() * 89999999)}`
  };
});

await PoliceStation.insertMany(stationsToInsert);
console.log(`${stationsToInsert.length} Police Stations seeded ✅`);

await mongoose.connection.close();
console.log('Done!');