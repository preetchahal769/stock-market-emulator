import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import logger from './lib/logger.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Log server startup
logger.info('Server is starting...');

// Routes
app.use('/api/auth', authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start server and connect to DB
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  connectDB(); // Connect to MongoDB
});
