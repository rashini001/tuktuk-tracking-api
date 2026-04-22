import mongoose from 'mongoose';

const locationPingSchema = new mongoose.Schema({
  tukTuk: { type: mongoose.Schema.Types.ObjectId, ref: 'TukTuk', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  speed: { type: Number, default: 0 },
  heading: { type: Number },
  timestamp: { type: Date, default: Date.now },
  province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province' },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District' }
}, { timestamps: false });

// Index for fast time-based and vehicle-based queries
locationPingSchema.index({ tukTuk: 1, timestamp: -1 });
locationPingSchema.index({ timestamp: -1 });
locationPingSchema.index({ district: 1, timestamp: -1 });
locationPingSchema.index({ province: 1, timestamp: -1 });

export default mongoose.model('LocationPing', locationPingSchema);