// config/db.js
//farah , adam 
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Check for both MONGO_URI and MONGODB_URI (for compatibility)
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ Error: MONGO_URI or MONGODB_URI environment variable is not set');
      console.error('Please create a .env file in the backend directory with your MongoDB Atlas connection string');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      // MongoDB connection options
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

