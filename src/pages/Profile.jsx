// src/pages/Profile.jsx
import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getSessionUser,
  getEnrollmentsNormalized,
  getCourseById,
  markCourseCompleted,
  unmarkCourseCompleted,
  isCourseCompleted,
  mockCourses,
} from "../data/mock";
import { useAuth } from "../state/auth.jsx";

// Helper to parse duration string (e.g., "20h" -> 20)
function parseDurationHours(duration) {
  if (!duration) return 0;
  const match = duration.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

// Helper to update progress in localStorage
function updateEnrollmentProgress(courseId, newProgress) {
  const enrollments = getEnrollmentsNormalized();
  const updated = enrollments.map(e =>
    e.courseId === courseId || String(e.courseId) === String(courseId)
      ? { ...e, progress: Math.max(0, Math.min(100, newProgress)) }
      : e
  );
  localStorage.setItem('ctms_enrollments', JSON.stringify(updated));
  return updated;
}

export default function Profile() {
  const { user: ctxUser } = useAuth() || { user: null };
  const user = ctxUser ?? getSessionUser();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect
  }

  const role = user?.role ?? "student";
  const isStudent = role === "student";

  // Get enrollments with progress
  const enrollments = useMemo(() => {
    const normalized = getEnrollmentsNormalized();
    return normalized
      .map((e) => {
        const course = getCourseById(e.courseId) ||
                      mockCourses.find(c => c.id === Number(e.courseId)) ||
                      mockCourses.find(c => String(c.id) === String(e.courseId));
        return course ? { ...e, course } : null;
      })
      .filter((e) => e !== null);
  }, [refreshKey]);

  // Calculate statistics
  const stats = useMemo(() => {
    const enrolled = enrollments.length;
    const completed = enrollments.filter(e => isCourseCompleted(e.courseId)).length;
    const totalHours = enrollments.reduce((sum, e) => {
      const hours = parseDurationHours(e.course?.duration);
      return sum + hours;
    }, 0);
    const certificates = completed; // One certificate per completed course

    return { enrolled, completed, totalHours, certificates };
  }, [enrollments]);

  // Calculate achievements
  const achievements = useMemo(() => {
    const earned = [];
    if (stats.enrolled > 0) {
      earned.push({ id: 'first-enrollment', icon: '🎯', title: 'First Enrollment', description: 'You enrolled in your first course!' });
    }
    if (stats.completed >= 3) {
      earned.push({ id: 'three-completed', icon: '🥇', title: 'Completed 3 Courses', description: 'You\'ve completed 3 courses!' });
    }
    if (stats.totalHours >= 100) {
      earned.push({ id: 'hundred-hours', icon: '💎', title: '100 Learning Hours', description: 'You\'ve logged 100+ learning hours!' });
    }
    return earned;
  }, [stats]);

  // Handle progress update
  const handleProgressUpdate = (courseId, newProgress) => {
    updateEnrollmentProgress(courseId, newProgress);
    setRefreshKey(k => k + 1);

    // Auto-mark as completed if progress reaches 100%
    if (newProgress >= 100 && !isCourseCompleted(courseId)) {
      markCourseCompleted(courseId);
      setRefreshKey(k => k + 1);
    }
  };

  // Generate mock "member since" date (random date in the past)
  const memberSince = useMemo(() => {
    const monthsAgo = Math.floor(Math.random() * 12) + 1; // 1-12 months ago
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, []);

  // Get user initials for avatar
  const userInitials = (user?.name ?? user?.email ?? "U").slice(0, 1).toUpperCase();

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      {/* Profile Info Card */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {userInitials}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{user?.name ?? "User"}</h2>
                <p className="text-gray-600 mt-1">{user?.email}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span>Member since {memberSince}</span>
                  <span className="inline-flex items-center rounded-lg bg-indigo-100 px-3 py-1 text-indigo-700 font-medium">
                    {role === "student" ? "Student" : "Instructor"}
                  </span>
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-medium"
                onClick={() => {
                  // Placeholder for edit profile modal (Phase 2)
                  alert("Edit Profile feature coming soon!");
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Statistics */}
      {isStudent && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600 font-medium">Courses Enrolled</div>
                <div className="text-2xl">📚</div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.enrolled}</div>
              <div className="text-xs text-gray-500 mt-1">Active enrollments</div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600 font-medium">Courses Completed</div>
                <div className="text-2xl">🏆</div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.completed}</div>
              <div className="text-xs text-gray-500 mt-1">Marked as finished</div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600 font-medium">Total Learning Hours</div>
                <div className="text-2xl">⏱️</div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{Math.round(stats.totalHours)}</div>
              <div className="text-xs text-gray-500 mt-1">Hours invested</div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600 font-medium">Certificates Earned</div>
                <div className="text-2xl">🎓</div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.certificates}</div>
              <div className="text-xs text-gray-500 mt-1">Certificates available</div>
            </div>
          </div>

          {/* My Courses & Progress */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Courses & Progress</h2>

            {enrollments.length === 0 ? (
              <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
                <div className="text-5xl mb-3">📚</div>
                <h3 className="text-xl font-semibold mb-2">No Enrollments Yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't enrolled in any courses yet. Browse our catalog to start learning!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center rounded-xl bg-black text-white px-6 py-3 hover:bg-black/90"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrollments.map(({ id, courseId, course, progress = 0 }) => {
                  const completed = isCourseCompleted(courseId);
                  const progressValue = completed ? 100 : (progress || 0);

                  return (
                    <div
                      key={id || courseId}
                      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg"
                    >
                      {/* Course Image */}
                      <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
                        {course.image ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-4xl absolute inset-0 grid place-items-center">🎓</span>
                        )}
                        {completed && (
                          <span className="absolute right-2 top-2 rounded-full bg-green-500 text-white text-xs px-2 py-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="p-5">
                        {/* Course Title */}
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2">{course.title}</h3>

                        {/* Instructor */}
                        <p className="text-sm text-gray-600 mb-3">
                          Instructor: <span className="font-medium text-gray-900">
                            {typeof course.instructor === 'string'
                              ? course.instructor
                              : course.instructor?.name || 'Unknown'}
                          </span>
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span className="font-medium">
                              {progressValue === 100 ? "Completed ✅" : "In Progress"}
                            </span>
                            <span className="font-semibold">Progress: {progressValue}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                progressValue === 100 ? 'bg-green-500' : 'bg-indigo-600'
                              }`}
                              style={{ width: `${progressValue}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/courses/${course.id}`}
                            className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-2.5 hover:bg-indigo-700 font-medium text-sm transition-colors"
                          >
                            Continue Learning
                          </Link>

                          {/* Progress Update Controls */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const newProgress = Math.min(100, progressValue + 10);
                                handleProgressUpdate(courseId, newProgress);
                              }}
                              disabled={progressValue >= 100}
                              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +10%
                            </button>
                            <button
                              onClick={() => {
                                if (completed) {
                                  // Unmark completion (set progress to 99%)
                                  updateEnrollmentProgress(courseId, 99);
                                  unmarkCourseCompleted(courseId);
                                  setRefreshKey(k => k + 1);
                                } else {
                                  handleProgressUpdate(courseId, 100);
                                }
                              }}
                              className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium ${
                                completed
                                  ? "border-green-300 text-green-700 bg-green-50 hover:bg-green-100"
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {completed ? "Mark Incomplete" : "Mark as Completed"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Achievements</h2>

            {achievements.length === 0 ? (
              <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
                <div className="text-4xl mb-3">🏅</div>
                <p className="text-gray-600">
                  Complete courses and reach milestones to unlock achievements!
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="rounded-2xl border bg-gradient-to-br from-yellow-50 to-amber-50 p-5 shadow-sm border-yellow-200"
                  >
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Instructor View */}
      {role === "instructor" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Instructor Tools</h2>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-gray-600 mb-4">
              As an instructor, you can create and curate courses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/manage"
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-black/90"
              >
                Manage Courses
              </Link>
              <Link
                to="/courses"
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
