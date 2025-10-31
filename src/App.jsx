// src/App.jsx
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import Enrollments from './pages/Enrollments'
import ManageCourse from './pages/ManageCourse'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import { Routes, Route, Navigate } from 'react-router-dom'
import { getSessionUser } from './data/mock'   // <- reads user {id,name,email,role} from localStorage

// --- tiny inline guards (no extra files needed) ---
function RequireLogin({ children }) {
  const user = getSessionUser()
  return user ? children : <Navigate to="/login" replace />
}

function RequireRole({ role, children }) {
  const user = getSessionUser()
  if (!user) return <Navigate to="/login" replace />
  return user.role === role ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected (must be logged in) */}
          <Route
            path="/profile"
            element={
              <RequireLogin>
                <Profile />
              </RequireLogin>
            }
          />

          {/* role-protected */}
          <Route
            path="/enrollments"
            element={
              <RequireRole role="student">
                <Enrollments />
              </RequireRole>
            }
          />

          <Route
            path="/manage"
            element={
              <RequireRole role="instructor">
                <ManageCourse />
              </RequireRole>
            }
          />

          {/* not found */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
