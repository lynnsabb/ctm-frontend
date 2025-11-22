// middleware/roleMiddleware.js
// Middleware to check user roles
// adam

export const requireInstructor = (req, res, next) => {
  if (req.user && req.user.role === 'instructor') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Instructors only' });
  }
};

// Alias for consistency
export const isInstructor = requireInstructor;

export const requireStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied: Students only' });
  }
};

