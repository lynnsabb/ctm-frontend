import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Protected from "./components/Protected.jsx";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Enrollments from "./pages/Enrollments";
import ManageCourse from "./pages/ManageCourse";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import LessonViewer from "./pages/LessonViewer";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const location = useLocation();

  // Hide Navbar and Footer on lesson viewer page
  const isLessonPage = location.pathname.includes('/learn/');

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {!isLessonPage && <Navbar />}
      <main className={`flex-1 ${!isLessonPage ? 'max-w-7xl mx-auto w-full px-4 py-8' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />

          {/* Lesson Viewer - Full Screen */}
          <Route
            path="/courses/:id/learn/:lessonId"
            element={
              <Protected role="student">
                <LessonViewer />
              </Protected>
            }
          />

          {/* Only logged-in students */}
          <Route
            path="/enrollments"
            element={
              <Protected role="student">
                <Enrollments />
              </Protected>
            }
          />

          {/* Only logged-in users (any role) */}
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />

          {/* Only instructors */}
          <Route
            path="/manage"
            element={
              <Protected role="instructor">
                <ManageCourse />
              </Protected>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!isLessonPage && <Footer />}
    </div>
  );
}
