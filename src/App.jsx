import { Routes, Route, Navigate } from "react-router-dom";
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

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />

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
      <Footer />
    </div>
  );
}
