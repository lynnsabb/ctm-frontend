import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";

const tab = ({ isActive }) =>
  "px-3 py-2 rounded-lg text-sm transition " +
  (isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50");

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <nav className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border">🎓</span>
          <span className="font-semibold text-lg tracking-tight">LearnHub</span>
        </Link>

        {/* Center tabs */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={tab}>Home</NavLink>
          <NavLink to="/courses" className={tab}>Courses</NavLink>
          {user?.role === "student" && (
            <NavLink to="/enrollments" className={tab}>My Learning</NavLink>
          )}
          {user?.role === "instructor" && (
            <NavLink to="/manage" className={tab}>Manage Courses</NavLink>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <NavLink to="/login" className="text-sm px-3 py-2 rounded-lg hover:bg-gray-50">Log in</NavLink>
              <NavLink to="/register" className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90">
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className="text-sm px-3 py-2 rounded-lg hover:bg-gray-50">Profile</NavLink>
              <button onClick={logout} className="text-sm px-3 py-2 rounded-lg hover:bg-gray-50">Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
