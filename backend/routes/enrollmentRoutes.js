// routes/enrollmentRoutes.js
// adam 
import express from 'express';
import {
  createEnrollment,
  getAllEnrollments,
  getMyEnrollments,
  getEnrollmentsByStudent,
  updateEnrollment,
  deleteEnrollment,
} from '../controllers/enrollmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireStudent } from '../middleware/roleMiddleware.js';
import { validateObjectId } from '../utils/validateObjectId.js';

const router = express.Router();

// All enrollment routes require authentication
router.use(authMiddleware);

/**
 * @route   POST /api/enrollments
 * @desc    Enroll a student in a course
 * @access  Private (Student only)
 */
router.post('/', requireStudent, createEnrollment);

/**
 * @route   GET /api/enrollments/me
 * @desc    Get current user's enrollments (student's own enrollments)
 * @access  Private
 */
router.get('/me', getMyEnrollments);

/**
 * @route   GET /api/enrollments
 * @desc    Get all enrollments (user's own if student, or all for instructor's courses)
 * @access  Private
 */
router.get('/', getAllEnrollments);

/**
 * @route   GET /api/enrollments/:studentId
 * @desc    Get enrollments for a specific student
 * @access  Private (Students can only see their own, instructors can see any)
 */
router.get('/:studentId', validateObjectId, getEnrollmentsByStudent);

/**
 * @route   PUT /api/enrollments/:id
 * @desc    Update enrollment progress
 * @access  Private (Student can update own, instructor can update for their courses)
 */
router.put('/:id', validateObjectId, updateEnrollment);

/**
 * @route   DELETE /api/enrollments/:id
 * @desc    Remove an enrollment
 * @access  Private (Student can delete own, instructor can delete for their courses)
 */
router.delete('/:id', validateObjectId, deleteEnrollment);

export default router;

