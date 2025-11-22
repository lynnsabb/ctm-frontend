# CTM Backend Server

Express.js backend server for the Course Training Management system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `backend` directory:
```bash
cd backend
# Create .env file with the following content:
```

3. Update `.env` with your MongoDB Atlas connection string:
```env
MONGO_URI="mongodb+srv://Webaholic:<db_password>@cluster0.egsdcdf.mongodb.net/ctm?retryWrites=true&w=majority&appName=Cluster0"
PORT=5000
JWT_SECRET=supersecret123
```

**Important:** Replace `<db_password>` with your actual MongoDB Atlas password.

## Running the Server

```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

The server will start on `http://localhost:5000`

## Database Seeding

Seed scripts populate your MongoDB Atlas database with initial data.

### Seed All (Recommended)
Runs all seed scripts in the correct order (Users → Courses → Enrollments):
```bash
cd backend
npm run seed:all
```

### Seed Individually
```bash
# Seed users only
npm run seed:users

# Seed courses only
npm run seed:courses

# Seed enrollments only (requires users and courses to exist first)
npm run seed:enrollments
```

**Note:** Seed scripts connect to your MongoDB Atlas database (configured in `.env`). Make sure your `.env` file is set up correctly before running seed scripts.

## API Routes

### Health Check
- **GET** `/api/health`
- Returns: `{ status: "ok" }`

## MongoDB

This project uses **MongoDB Atlas** (cloud database). 

- All data is stored in the `ctm` database on your Atlas cluster
- Connection string is configured in the `.env` file
- Make sure your Atlas cluster allows connections from your IP address

