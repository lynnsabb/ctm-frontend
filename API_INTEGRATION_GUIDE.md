# API Integration Guide - Frontend to Backend

This document lists EVERY location where API calls should replace mock data and localStorage logic, with axios-based code snippets.

## Prerequisites

First, install axios:
```bash
npm install axios
```

Create an axios instance file: `src/api/axios.js`
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 1. AUTHENTICATION (src/state/auth.jsx)

### Location: `src/state/auth.jsx`

**Current Implementation:**
- Uses `mockLogin`, `mockLogout`, `getSessionUser` from mock.jsx
- Stores user in localStorage as `ctms_user`

**Replace with:**

```javascript
// src/state/auth.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return <AuthCtx.Provider value={{ user, login, logout, loading }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
```

---

## 2. REGISTER PAGE (src/pages/Register.jsx)

### Location: `src/pages/Register.jsx` - Line 11-15

**Current Implementation:**
- Shows alert and navigates to login

**Replace with:**

```javascript
import api from "../api/axios";

const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/auth/register', {
      name: form.name,
      email: form.email,
      password: form.password,
      role: 'student' // or get from form if you add role selection
    });
    
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    nav("/login");
  } catch (error) {
    console.error('Registration error:', error);
    alert(error.response?.data?.message || 'Registration failed');
  }
};
```

---

## 3. LOGIN PAGE (src/pages/Login.jsx)

### Location: `src/pages/Login.jsx` - Line 13-25

**Current Implementation:**
- Uses `login` from useAuth (which uses mockLogin)

**Already handled in auth.jsx above** - No changes needed, but ensure error handling:

```javascript
const onSubmit = async (e) => {
  e.preventDefault();
  setErr("");
  if (!email || !pwd) return setErr("Please enter both email and password.");

  const ok = await login(email, pwd);
  if (!ok) {
    setErr("Invalid credentials. Please check your email and password.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.role === "student") nav("/enrollments");
  else if (user?.role === "instructor") nav("/manage");
  else nav("/profile");
};
```

---

## 4. HOME PAGE (src/pages/Home.jsx)

### Location 1: Line 4-13 - Import mockCourses
**Replace with:**

```javascript
import { useState, useEffect } from 'react';
import api from '../api/axios';

// In component:
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchCourses();
}, []);
```

### Location 2: Line 209-211 - Popular courses calculation
**No change needed** - Just use `courses` state instead of imported `mockCourses`

### Location 3: Line 225 - Featured instructors
**Note:** Instructors data is not in backend yet. Keep mock for now or create endpoint later.

---

## 5. COURSES PAGE (src/pages/Courses.jsx)

### Location: Line 3 - Import mockCourses
**Replace with:**

```javascript
import { useState, useEffect, useMemo } from "react";
import api from "../api/axios";

// In component:
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchCourses();
}, []);

// Update useMemo dependencies to use courses state
const categories = useMemo(() => ['All', ...Array.from(new Set(courses.map(c => c.category)))], [courses]);
const levels = useMemo(() => ['All', ...Array.from(new Set(courses.map(c => c.level)))], [courses]);
```

---

## 6. COURSE DETAILS PAGE (src/pages/CourseDetails.jsx)

### Location 1: Line 3 - Import mockCourses, enrollment functions
**Replace with:**

```javascript
import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../state/auth.jsx";

// In component:
const [course, setCourse] = useState(null);
const [loading, setLoading] = useState(true);
const [isEnrolled, setIsEnrolled] = useState(false);

useEffect(() => {
  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${idParam}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };
  
  const checkEnrollment = async () => {
    if (!user) return;
    try {
      const response = await api.get('/enrollments');
      const enrollments = response.data;
      setIsEnrolled(enrollments.some(e => e.courseId === idParam || e.courseId === String(idParam)));
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };
  
  if (idParam) {
    fetchCourse();
    if (user) checkEnrollment();
  }
}, [idParam, user]);
```

### Location 2: Line 113-126 - handleEnroll function
**Replace with:**

```javascript
const handleEnroll = async () => {
  if (!canEnroll || isEnrolled || !courseData?.id) return;
  
  try {
    await api.post('/enrollments', {
      courseId: courseData.id,
      progress: 0,
      completed: false,
      completedLessons: 0
    });
    
    setIsEnrolled(true);
    setShowToast(true);
    
    setTimeout(() => {
      navigate("/enrollments");
    }, 1500);
  } catch (error) {
    console.error('Enrollment error:', error);
    alert(error.response?.data?.message || 'Failed to enroll in course');
  }
};
```

---

## 7. ENROLLMENTS PAGE (src/pages/Enrollments.jsx)

### Location 1: Line 3-11 - Import enrollment functions
**Replace with:**

```javascript
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../state/auth.jsx";

// In component:
const [enrollments, setEnrollments] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchEnrollments = async () => {
    try {
      const response = await api.get('/enrollments');
      const enrollmentsData = response.data;
      
      // Fetch course details for each enrollment
      const enrollmentsWithCourses = await Promise.all(
        enrollmentsData.map(async (enrollment) => {
          try {
            const courseResponse = await api.get(`/courses/${enrollment.courseId}`);
            return { ...enrollment, course: courseResponse.data };
          } catch (error) {
            console.error(`Error fetching course ${enrollment.courseId}:`, error);
            return null;
          }
        })
      );
      
      setEnrollments(enrollmentsWithCourses.filter(e => e !== null));
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (user) {
    fetchEnrollments();
  }
}, [user, refreshKey]);
```

### Location 2: Line 55-61 - toggleComplete function
**Replace with:**

```javascript
const toggleComplete = async (courseId, enrollmentId) => {
  try {
    const enrollment = enrollments.find(e => e.courseId === courseId);
    const newCompleted = !enrollment.completed;
    
    await api.put(`/enrollments/${enrollmentId}`, {
      completed: newCompleted,
      progress: newCompleted ? 100 : enrollment.progress
    });
    
    setRefreshKey((k) => k + 1);
  } catch (error) {
    console.error('Error updating enrollment:', error);
    alert(error.response?.data?.message || 'Failed to update enrollment');
  }
};
```

---

## 8. PROFILE PAGE (src/pages/Profile.jsx)

### Location 1: Line 4-12 - Import mock functions
**Replace with:**

```javascript
import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../state/auth.jsx";

// In component:
const [enrollments, setEnrollments] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchEnrollments = async () => {
    if (!user) return;
    
    try {
      const response = await api.get('/enrollments');
      const enrollmentsData = response.data;
      
      const enrollmentsWithCourses = await Promise.all(
        enrollmentsData.map(async (enrollment) => {
          try {
            const courseResponse = await api.get(`/courses/${enrollment.courseId}`);
            return { ...enrollment, course: courseResponse.data };
          } catch (error) {
            return null;
          }
        })
      );
      
      setEnrollments(enrollmentsWithCourses.filter(e => e !== null));
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchEnrollments();
}, [user, refreshKey]);
```

### Location 2: Line 96-105 - handleProgressUpdate function
**Replace with:**

```javascript
const handleProgressUpdate = async (courseId, newProgress, enrollmentId) => {
  try {
    await api.put(`/enrollments/${enrollmentId}`, {
      progress: Math.max(0, Math.min(100, newProgress)),
      completed: newProgress >= 100
    });
    
    setRefreshKey(k => k + 1);
  } catch (error) {
    console.error('Error updating progress:', error);
    alert(error.response?.data?.message || 'Failed to update progress');
  }
};
```

### Location 3: Line 306-313 - Mark as completed button
**Replace with:**

```javascript
onClick={async () => {
  const enrollment = enrollments.find(e => e.courseId === courseId);
  if (!enrollment) return;
  
  if (completed) {
    await api.put(`/enrollments/${enrollment.id}`, {
      progress: 99,
      completed: false
    });
  } else {
    await api.put(`/enrollments/${enrollment.id}`, {
      progress: 100,
      completed: true
    });
  }
  
  setRefreshKey(k => k + 1);
}}
```

---

## 9. MANAGE COURSE PAGE (src/pages/ManageCourse.jsx)

### Location 1: Line 2 - Import mockCourses
**Replace with:**

```javascript
import { useState, useMemo, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../state/auth.jsx";

// In component:
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      // Filter to only show courses created by current instructor
      const instructorCourses = response.data.filter(
        course => course.createdBy?._id === user?.id || course.createdBy === user?.id
      );
      setCourses(instructorCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (user?.role === 'instructor') {
    fetchCourses();
  }
}, [user]);
```

### Location 2: Line 182-209 - handleSubmit function
**Replace with:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingCourse) {
      // Update existing course
      const response = await api.put(`/courses/${editingCourse._id}`, {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        description: formData.description,
        duration: parseInt(formData.duration.replace('h', '')) || 0,
        image: formData.image,
        rating: formData.rating,
        students: formData.students,
      });
      
      setCourses((prev) =>
        prev.map((c) => (c._id === editingCourse._id ? response.data : c))
      );
      showToast("✅ Course updated successfully", "success");
    } else {
      // Add new course
      const response = await api.post('/courses', {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        description: formData.description,
        duration: parseInt(formData.duration.replace('h', '')) || 0,
        image: formData.image,
        rating: formData.rating,
        students: formData.students,
        curriculum: [],
        learningPoints: [],
      });
      
      setCourses((prev) => [response.data, ...prev]);
      showToast("✅ Course added successfully", "success");
    }

    handleCloseModal();
  } catch (error) {
    console.error('Error saving course:', error);
    showToast(error.response?.data?.message || "Failed to save course", "error");
  }
};
```

### Location 3: Line 218-225 - handleConfirmDelete function
**Replace with:**

```javascript
const handleConfirmDelete = async () => {
  if (courseToDelete) {
    try {
      await api.delete(`/courses/${courseToDelete._id}`);
      setCourses((prev) => prev.filter((c) => c._id !== courseToDelete._id));
      showToast("✅ Course deleted successfully", "success");
    } catch (error) {
      console.error('Error deleting course:', error);
      showToast(error.response?.data?.message || "Failed to delete course", "error");
    }
  }
  setIsDeleteModalOpen(false);
  setCourseToDelete(null);
};
```

---

## 10. NAVBAR COMPONENT (src/components/Navbar.jsx)

**No API calls needed** - Already uses `useAuth` which will be updated in auth.jsx

---

## 11. PROTECTED COMPONENT (src/components/Protected.jsx)

**No API calls needed** - Already uses `useAuth`

---

## Summary of API Endpoints Used

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/:id` - Get single course (public)
- `POST /api/courses` - Create course (instructor only)
- `PUT /api/courses/:id` - Update course (instructor only, creator)
- `DELETE /api/courses/:id` - Delete course (instructor only, creator)

### Enrollments (TO BE IMPLEMENTED)
- `GET /api/enrollments` - Get user's enrollments (authenticated)
- `POST /api/enrollments` - Create enrollment (student only)
- `PUT /api/enrollments/:id` - Update enrollment progress (student only)
- `DELETE /api/enrollments/:id` - Remove enrollment (student only)

---

## Important Notes

1. **Enrollment Routes**: The enrollment routes need to be implemented in the backend first
2. **Course ID Format**: Backend uses MongoDB `_id` (ObjectId), frontend may use numeric `id`. You may need to map between them
3. **Duration Format**: Backend expects number (hours), frontend uses string like "20h". Convert accordingly
4. **Error Handling**: All API calls should have proper error handling and user feedback
5. **Loading States**: Add loading indicators where data is being fetched
6. **Token Management**: Token is stored in localStorage and automatically added to requests via axios interceptor

