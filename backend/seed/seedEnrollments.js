// backend/seed/seedEnrollments.js
// adam , lynn
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

// Load environment variables
dotenv.config();

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

// Generate random number between min and max (inclusive)
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Seed enrollments
const seedEnrollments = async () => {
  try {
    await connectDB();

    // Fetch all users
    console.log('👥 Fetching users...');
    const users = await User.find();
    console.log(`   Found ${users.length} users`);

    // Filter to only students
    const students = users.filter(user => user.role === 'student');
    console.log(`   Found ${students.length} students`);

    if (students.length === 0) {
      console.log('⚠️  No students found. Please seed users first with: npm run seed:users');
      await mongoose.connection.close();
      process.exit(1);
    }

    // Fetch all courses
    console.log('📚 Fetching courses...');
    const courses = await Course.find();
    console.log(`   Found ${courses.length} courses`);

    if (courses.length === 0) {
      console.log('⚠️  No courses found. Please seed courses first with: npm run seed:courses');
      await mongoose.connection.close();
      process.exit(1);
    }

    // Delete existing enrollments
    console.log('🗑️  Deleting existing enrollments...');
    const deleteResult = await Enrollment.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} existing enrollments`);

    // Create enrollments for each student
    console.log('💾 Creating enrollments...');
    const enrollmentsToInsert = [];

    for (const student of students) {
      // Random number of enrollments per student (1-3)
      const numEnrollments = randomInt(1, 3);
      
      // Get random courses for this student (avoid duplicates)
      const availableCourses = [...courses];
      const selectedCourses = [];
      
      for (let i = 0; i < numEnrollments && availableCourses.length > 0; i++) {
        const randomIndex = randomInt(0, availableCourses.length - 1);
        const selectedCourse = availableCourses.splice(randomIndex, 1)[0];
        selectedCourses.push(selectedCourse);
      }

      // Create enrollment for each selected course
      for (const course of selectedCourses) {
        // Random progress between 0-100
        const progress = randomInt(0, 100);
        const completed = progress === 100;
        
        // Estimate completedLessons based on progress
        // Assuming a course has multiple lessons, estimate based on progress percentage
        const estimatedTotalLessons = 10; // Default estimate
        const completedLessons = Math.floor((progress / 100) * estimatedTotalLessons);

        enrollmentsToInsert.push({
          userId: student._id,
          courseId: course._id,
          progress: progress,
          completed: completed,
          completedLessons: completedLessons,
        });
      }
    }

    // Insert enrollments
    console.log(`   Creating ${enrollmentsToInsert.length} enrollments...`);
    const result = await Enrollment.insertMany(enrollmentsToInsert, { ordered: false });
    console.log(`✅ Successfully seeded ${result.length} enrollments!`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   Total enrollments: ${result.length}`);
    console.log(`   Students enrolled: ${students.length}`);
    
    const completedEnrollments = result.filter(e => e.completed).length;
    const inProgressEnrollments = result.length - completedEnrollments;
    
    console.log(`   Completed: ${completedEnrollments}`);
    console.log(`   In Progress: ${inProgressEnrollments}`);

    // Show enrollments per student
    console.log('\n📝 Enrollments by Student:');
    for (const student of students) {
      const studentEnrollments = result.filter(e => String(e.userId) === String(student._id));
      if (studentEnrollments.length > 0) {
        console.log(`   ${student.name} (${student.email}): ${studentEnrollments.length} enrollment(s)`);
        studentEnrollments.forEach(enrollment => {
          const course = courses.find(c => String(c._id) === String(enrollment.courseId));
          const courseTitle = course ? course.title : 'Unknown Course';
          console.log(`      - ${courseTitle}: ${enrollment.progress}% ${enrollment.completed ? '✓ Completed' : ''}`);
        });
      }
    }

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    console.log('✨ Seeding completed successfully!');

    // Exit cleanly
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding enrollments:', error);
    // Close connection on error
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

// Run the seed script
seedEnrollments();

