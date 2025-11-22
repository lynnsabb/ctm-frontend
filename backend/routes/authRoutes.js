// routes/authRoutes.js
// farah
import express from 'express';
import {
  register,
  login,
  checkAuth,
  getUsers,
  getProfile,
  getUserById,
  updateProfile,
  changePassword,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateObjectId } from '../utils/validateObjectId.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No JWT Required)
// ============================================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and get JWT token
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/check
 * @desc    Health check endpoint - returns server status
 * @access  Public
 */
router.get('/check', checkAuth);

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (for testing only)
 * @access  Public
 */
router.get('/users', getUsers);

// ============================================
// PROTECTED ROUTES (JWT Required)
// ============================================

/**
 * @route   GET /api/auth/profile
 * @desc    Get logged-in user's profile data
 * @access  Private
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * @route   GET /api/auth/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/users/:id', authMiddleware, validateObjectId, getUserById);

/**
 * @route   PUT /api/auth/update-profile
 * @desc    Update user profile (name and email)
 * @access  Private
 */
router.put('/update-profile', authMiddleware, updateProfile);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put('/change-password', authMiddleware, changePassword);

export default router;

