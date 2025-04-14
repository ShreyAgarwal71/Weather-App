import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import weatherRecordRoutes from './routes/weatherRecord.routes';
import exportRoutes from './routes/export.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/weatherdb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/weather-records', weatherRecordRoutes);
app.use("/api", exportRoutes);


export default app;
