import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Province from '../models/Province.js';
import District from '../models/District.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const provinces = [
  { name: 'Western', code: 'WP' },
  { name: 'Central', code: 'CP' },
  { name: 'Southern', code: 'SP' },
  { name: 'Northern', code: 'NP' },
  { name: 'Eastern', code: 'EP' },
  { name: 'North Western', code: 'NWP' },
  { name: 'North Central', code: 'NCP' },
  { name: 'Uva', code: 'UP' },
  { name: 'Sabaragamuwa', code: 'SGP' }
];

await Province.deleteMany();
const savedProvinces = await Province.insertMany(provinces);
console.log('Provinces seeded:', savedProvinces.length);

const getProvId = (code) => savedProvinces.find(p => p.code === code)._id;

// All 25 districts mapped to their province
const districts = [
  // Western (3)
  { name: 'Colombo', code: 'CMB', province: getProvId('WP') },
  { name: 'Gampaha', code: 'GAM', province: getProvId('WP') },
  { name: 'Kalutara', code: 'KAL', province: getProvId('WP') },
  // Central (3)
  { name: 'Kandy', code: 'KAN', province: getProvId('CP') },
  { name: 'Matale', code: 'MAT', province: getProvId('CP') },
  { name: 'Nuwara Eliya', code: 'NUW', province: getProvId('CP') },
  // Southern (3)
  { name: 'Galle', code: 'GAL', province: getProvId('SP') },
  { name: 'Matara', code: 'MTA', province: getProvId('SP') },
  { name: 'Hambantota', code: 'HAM', province: getProvId('SP') },
  // Northern (5)
  { name: 'Jaffna', code: 'JAF', province: getProvId('NP') },
  { name: 'Kilinochchi', code: 'KIL', province: getProvId('NP') },
  { name: 'Mannar', code: 'MAN', province: getProvId('NP') },
  { name: 'Mullaitivu', code: 'MUL', province: getProvId('NP') },
  { name: 'Vavuniya', code: 'VAV', province: getProvId('NP') },
  // Eastern (3)
  { name: 'Batticaloa', code: 'BAT', province: getProvId('EP') },
  { name: 'Ampara', code: 'AMP', province: getProvId('EP') },
  { name: 'Trincomalee', code: 'TRI', province: getProvId('EP') },
  // North Western (2)
  { name: 'Kurunegala', code: 'KUR', province: getProvId('NWP') },
  { name: 'Puttalam', code: 'PUT', province: getProvId('NWP') },
  // North Central (2)
  { name: 'Anuradhapura', code: 'ANU', province: getProvId('NCP') },
  { name: 'Polonnaruwa', code: 'POL', province: getProvId('NCP') },
  // Uva (2)
  { name: 'Badulla', code: 'BAD', province: getProvId('UP') },
  { name: 'Monaragala', code: 'MON', province: getProvId('UP') },
  // Sabaragamuwa (2)
  { name: 'Ratnapura', code: 'RAT', province: getProvId('SGP') },
  { name: 'Kegalle', code: 'KEG', province: getProvId('SGP') }
];

await District.deleteMany();
const savedDistricts = await District.insertMany(districts);
console.log('Districts seeded:', savedDistricts.length);

mongoose.connection.close();