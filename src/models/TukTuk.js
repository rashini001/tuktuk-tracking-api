import mongoose from 'mongoose';

const tukTukSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  ownerName: { type: String, required: true },
  ownerNIC: { type: String, required: true },
  ownerContact: { type: String },
  deviceId: { type: String, required: true, unique: true },
  homeDistrict: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  homeProvince: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
  isActive: { type: Boolean, default: true },
  lastKnownLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date }
  }
}, { timestamps: true });

export default mongoose.model('TukTuk', tukTukSchema);