import mongoose from 'mongoose';
import { config } from '../config';

export async function connectDB() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
