// backend/seed/seedUsers.js
// adam , lynn
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

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

// Create mock users with hashed passwords
const createMockUsers = async () => {
  const mockUsers = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'student',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      role: 'student',
    },
    {
      name: 'Emma Thompson',
      email: 'emma.thompson@example.com',
      password: 'password123',
      role: 'instructor',
    },
    {
      name: 'Dr. Liam Carter',
      email: 'liam.carter@example.com',
      password: 'password123',
      role: 'instructor',
    },
    {
      name: 'Sophia Miller',
      email: 'sophia.miller@example.com',
      password: 'password123',
      role: 'instructor',
    },
    {
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      password: 'password123',
      role: 'student',
    },
    {
      name: 'Ethan Williams',
      email: 'ethan.williams@example.com',
      password: 'password123',
      role: 'instructor',
    },
    {
      name: 'Olivia Brown',
      email: 'olivia.brown@example.com',
      password: 'password123',
      role: 'student',
    },
  ];

  // Hash all passwords
  const usersWithHashedPasswords = await Promise.all(
    mockUsers.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      };
    })
  );

  return usersWithHashedPasswords;
};

// Seed users
const seedUsers = async () => {
  try {
    await connectDB();

    // Create mock users with hashed passwords
    console.log('🔐 Creating mock users with hashed passwords...');
    const usersToInsert = await createMockUsers();
    console.log(`📝 Prepared ${usersToInsert.length} users for seeding`);

    // Delete existing users
    console.log('🗑️  Deleting existing users...');
    const deleteResult = await User.deleteMany({});
    console.log(`   Deleted ${deleteResult.deletedCount} existing users`);

    // Insert users
    console.log('💾 Inserting users...');
    const result = await User.insertMany(usersToInsert, { ordered: false });
    console.log(`✅ Successfully seeded ${result.length} users!`);

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   Total users: ${result.length}`);
    
    const students = result.filter(u => u.role === 'student');
    const instructors = result.filter(u => u.role === 'instructor');
    
    console.log(`   Students: ${students.length}`);
    console.log(`   Instructors: ${instructors.length}`);

    console.log('\n👥 User Accounts Created:');
    result.forEach((user) => {
      console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
    });

    console.log('\n🔑 All users have password: "password123"');

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    console.log('✨ Seeding completed successfully!');

    // Exit cleanly
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    // Close connection on error
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

// Run the seed script
seedUsers();

