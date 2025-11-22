// backend/seed/seedCourses.js
// adam , lynn
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Course from '../models/Course.js';

// Load environment variables
dotenv.config();

// Get current directory (ES modules way)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ Error: MONGO_URI or MONGODB_URI environment variable is not set');
      console.error('Please create a .env file in the backend directory with your MongoDB Atlas connection string');
      process.exit(1);
    }
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Import mock data from frontend file
const importMockData = () => {
  try {
    // Try multiple possible paths
    const possiblePaths = [
      join(__dirname, '../../src/data/mock.jsx'), // If src is sibling to backend
      join(__dirname, '../ctm-frontend/src/data/mock.jsx'), // If ctm-frontend folder exists
      join(__dirname, '../../ctm-frontend/src/data/mock.jsx'), // Alternative path
    ];

    let mockDataContent = null;
    let usedPath = null;

    for (const path of possiblePaths) {
      try {
        mockDataContent = readFileSync(path, 'utf-8');
        usedPath = path;
        console.log(`✅ Found mock data at: ${path}`);
        break;
      } catch (err) {
        // Try next path
        continue;
      }
    }

    if (!mockDataContent) {
      throw new Error('Could not find mock.jsx file. Tried paths: ' + possiblePaths.join(', '));
    }

    // Extract mockCourses array from the file
    // The file exports: export const mockCourses = [...]
    // Find the start of the array
    const exportIndex = mockDataContent.indexOf('export const mockCourses =');
    if (exportIndex === -1) {
      throw new Error('Could not find "export const mockCourses" in the file');
    }

    // Find the opening bracket after the equals sign
    const startIndex = mockDataContent.indexOf('[', exportIndex);
    if (startIndex === -1) {
      throw new Error('Could not find opening bracket for mockCourses array');
    }

    // Find the matching closing bracket by counting brackets
    let bracketCount = 0;
    let endIndex = startIndex;
    let inString = false;
    let stringChar = null;

    for (let i = startIndex; i < mockDataContent.length; i++) {
      const char = mockDataContent[i];
      const prevChar = i > 0 ? mockDataContent[i - 1] : '';

      // Handle string escaping
      if (prevChar !== '\\') {
        if ((char === '"' || char === "'" || char === '`') && !inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && inString) {
          inString = false;
          stringChar = null;
        }
      }

      if (!inString) {
        if (char === '[') bracketCount++;
        if (char === ']') {
          bracketCount--;
          if (bracketCount === 0) {
            endIndex = i + 1;
            break;
          }
        }
      }
    }

    if (bracketCount !== 0) {
      throw new Error('Could not find matching closing bracket for mockCourses array');
    }

    // Extract the array string
    const arrayStr = mockDataContent.substring(startIndex, endIndex);

    // Use Function constructor for safer evaluation (better than eval)
    const mockCourses = new Function('return ' + arrayStr)();
    
    return mockCourses;
  } catch (error) {
    console.error('❌ Error importing mock data:', error.message);
    throw error;
  }
};

// Seed courses
const seedCourses = async () => {
  try {
    await connectDB();

    // Import mock data
    console.log('📥 Importing mock course data...');
    const mockCourses = importMockData();
    
    if (!mockCourses || !Array.isArray(mockCourses)) {
      throw new Error('Invalid mock data format');
    }

    console.log(`📚 Found ${mockCourses.length} courses to seed`);

    // Delete existing courses
    console.log('🗑️  Deleting existing courses...');
    const deleteResult = await Course.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} existing courses`);

    // Transform mock data to match Mongoose schema
    // Remove the numeric 'id' field (MongoDB will generate _id)
    // Keep all other fields including nested curriculum structure
    const coursesToInsert = mockCourses.map((course) => {
      const { id, ...courseData } = course;
      
      // Ensure curriculum structure is correct
      const transformedCourse = {
        ...courseData,
        curriculum: course.curriculum || [],
      };

      return transformedCourse;
    });

    // Insert courses
    console.log('💾 Inserting courses...');
    const result = await Course.insertMany(coursesToInsert, { ordered: false });
    console.log(`✅ Successfully seeded ${result.length} courses!`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   Total courses: ${result.length}`);
    console.log(`   Categories: ${[...new Set(result.map(c => c.category))].join(', ')}`);
    console.log(`   Levels: ${[...new Set(result.map(c => c.level))].join(', ')}`);

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    console.log('✨ Seeding completed successfully!');

    // Exit cleanly
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    // Close connection on error
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

// Run the seed script
seedCourses();

