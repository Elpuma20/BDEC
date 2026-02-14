import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import applicationRoutes from './routes/applicationRoutes';

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Initialize Database
initDB().then(() => {
    console.log('Database connected and initialized');
}).catch(err => {
    console.error('Database initialization failed', err);
});

// Basic Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'BDEC Backend' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
