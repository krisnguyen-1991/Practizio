import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import practiceRoutes from './routes/practice.js';
import miniPracticeRoutes from './routes/miniPractice.js';
import { initializeDatabase } from './database/db.js';

// Load environment variables
dotenv.config();

// Initialize database
initializeDatabase();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/practice', practiceRoutes);
app.use('/api/mini-practices', miniPracticeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Practizio API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Practizio API server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

