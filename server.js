import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import connectDB from './src/config/db.js';
import { swaggerSpec } from './src/config/swagger.js';
import { errorHandler } from './src/middleware/errorHandler.js';

import authRoutes from './src/routes/auth.routes.js';
import provinceRoutes from './src/routes/province.routes.js';
import districtRoutes from './src/routes/district.routes.js';
import policeStationRoutes from './src/routes/policeStation.routes.js';
import tukTukRoutes from './src/routes/tuktuk.routes.js';
import locationRoutes from './src/routes/location.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api', limiter);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/provinces', provinceRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/police-stations', policeStationRoutes);
app.use('/api/tuktuk', tukTukRoutes);
app.use('/api/locations', locationRoutes);

// Health check
app.get('/', (req, res) => res.json({ success: true, message: 'TukTuk Tracking API is running' }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));