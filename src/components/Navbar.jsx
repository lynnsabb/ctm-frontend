// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate("/"); // redirect instantly after logout
  };

  // Optional: close mobile menu on route change
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  return (
    <header className="border-b bg-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-gray-900"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border">🎓</span>
          LearnHub
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-black" : "text-gray-600 hover:text-black"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-black" : "text-gray-600 hover:text-black"
              }`
            }
          >
            Courses
          </NavLink>

          {/* Student-only link */}
          {user?.role === "student" && (
            <NavLink
              to="/enrollments"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                }`
              }
            >
              My Learning
            </NavLink>
          )}

          {/* Instructor-only link */}
          {user?.role === "instructor" && (
            <NavLink
              to="/manage"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                }`
              }
            >
              Manage Courses
            </NavLink>
          )}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <NavLink
                to="/profile"
                className="text-sm text-gray-700 hover:text-black"
              >
                {user.name?.split(" ")[0] ?? "Profile"}
              </NavLink>
              <button
                onClick={onLogout}
                className="rounded-xl bg-black text-white text-sm px-4 py-2 hover:bg-black/90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-black"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-black text-white text-sm px-4 py-2 hover:bg-black/90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600 hover:text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-3">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
            Home
          </NavLink>
          <NavLink to="/courses" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
            Courses
          </NavLink>

          {user?.role === "student" && (
            <NavLink to="/enrollments" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
              My Learning
            </NavLink>
          )}
          {user?.role === "instructor" && (
            <NavLink to="/manage" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
              Manage Courses
            </NavLink>
          )}

          <hr />

          {user ? (
            <>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
                Log in
              </NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-black">
                Sign up
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}
