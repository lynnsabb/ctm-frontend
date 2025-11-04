// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <Link
              to="/"
              className="flex items-center gap-3 font-semibold text-lg text-gray-900 mb-4"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/4431/4431898.png"
                alt="LearnHub Logo"
                className="w-10 h-10 object-contain rounded-lg"
              />
              LearnHub
            </Link>
            <p className="text-sm text-gray-600">Course Tutorial Management System</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {user ? (
                <>
                  <li>
                    <Link
                      to="/"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/courses"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Courses
                    </Link>
                  </li>

                  {user.role === "student" && (
                    <li>
                      <Link
                        to="/enrollments"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        My Learning
                      </Link>
                    </li>
                  )}

                  {user.role === "instructor" && (
                    <li>
                      <Link
                        to="/manage"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Manage Courses
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="/profile"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@learnhub.com"
                  className="text-indigo-600 hover:underline"
                >
                  support@learnhub.com
                </a>
              </li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: Beirut, Lebanon</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} LearnHub • Course Tutorial Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
