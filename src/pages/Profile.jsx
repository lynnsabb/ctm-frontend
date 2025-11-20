<<<<<<< HEAD
// src/pages/Profile.jsx
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
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

<<<<<<< HEAD
// Helper to parse duration string (e.g., "20h" -> 20)
function parseDurationHours(duration) {
  if (!duration) return 0;
  const match = duration.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

// Helper to update progress in localStorage
=======
function parseDurationHours(duration) {
  if (!duration) return 0;
  const m = duration.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
function updateEnrollmentProgress(courseId, newProgress) {
  const enrollments = getEnrollmentsNormalized();
  const updated = enrollments.map(e =>
    e.courseId === courseId || String(e.courseId) === String(courseId)
      ? { ...e, progress: Math.max(0, Math.min(100, newProgress)) }
      : e
  );
<<<<<<< HEAD
  localStorage.setItem('ctms_enrollments', JSON.stringify(updated));
=======
  localStorage.setItem("ctms_enrollments", JSON.stringify(updated));
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  return updated;
}

export default function Profile() {
  const { user: ctxUser } = useAuth() || { user: null };
<<<<<<< HEAD
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
=======
  const navigate = useNavigate();

  const [user, setUser] = useState(() => ctxUser ?? getSessionUser());
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    specialty: user?.specialty || "",
    yearsOfExperience: user?.yearsOfExperience || "",
  }));
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    setUser(ctxUser ?? getSessionUser());
  }, [ctxUser]);

  if (!user) return null;

  const role = user.role ?? "student";
  const isStudent = role === "student";
  const initials = (user?.name ?? user?.email ?? "U").slice(0, 1).toUpperCase();

  const enrollments = useMemo(() => {
    if (!isStudent) return [];
    const normalized = getEnrollmentsNormalized();
    return normalized
      .map((e) => {
        const course =
          getCourseById(e.courseId) ||
          mockCourses.find((c) => c.id === Number(e.courseId)) ||
          mockCourses.find((c) => String(c.id) === String(e.courseId));
        return course ? { ...e, course } : null;
      })
      .filter(Boolean);
  }, [isStudent, refreshKey]);

  const stats = useMemo(() => {
    if (!isStudent) return { enrolled: 0, completed: 0, totalHours: 0, certificates: 0 };
    const enrolled = enrollments.length;
    const completed = enrollments.filter((e) => isCourseCompleted(e.courseId)).length;
    const totalHours = enrollments.reduce((s, e) => s + parseDurationHours(e.course?.duration), 0);
    return { enrolled, completed, totalHours, certificates: completed };
  }, [isStudent, enrollments]);

  const instructorCourses = useMemo(() => {
    if (isStudent) return [];
    return mockCourses.filter((c) => {
      if (typeof c.instructor === "string") return c.instructor === user.name;
      if (c.instructor && typeof c.instructor === "object") {
        return c.instructor.name === user.name || c.instructor.id === user.id;
      }
      return false;
    });
  }, [isStudent, user?.name, user?.id]);

  const handleProgressUpdate = (courseId, newProgress) => {
    updateEnrollmentProgress(courseId, newProgress);
    setRefreshKey((k) => k + 1);
    if (newProgress >= 100 && !isCourseCompleted(courseId)) {
      markCourseCompleted(courseId);
      setRefreshKey((k) => k + 1);
    }
  };

  const memberSince = useMemo(() => {
    const monthsAgo = Math.floor(Math.random() * 12) + 1;
    const d = new Date();
    d.setMonth(d.getMonth() - monthsAgo);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, []);

  const openEdit = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      specialty: user?.specialty || "",
      yearsOfExperience: user?.yearsOfExperience || "",
    });
    setEditing(true);
  };

  const saveEdit = (e) => {
    e?.preventDefault?.();
    const updated = {
      ...user,
      name: form.name.trim() || user.name,
      email: form.email.trim() || user.email,
      bio: form.bio,
      specialty: form.specialty,
      yearsOfExperience: form.yearsOfExperience ? Number(form.yearsOfExperience) : user.yearsOfExperience,
    };
    localStorage.setItem("ctms_user", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button
          className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-medium"
          onClick={openEdit}
        >
          Edit Profile
        </button>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {initials}
          </div>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{user?.name ?? "User"}</h2>
                <p className="text-gray-600 mt-1">{user?.email}</p>
<<<<<<< HEAD
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
=======
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span>Member since {memberSince}</span>
                  <span className="inline-flex items-center rounded-lg bg-indigo-100 px-3 py-1 text-indigo-700 font-medium">
                    {isStudent ? "Student" : "Instructor"}
                  </span>
                  {!isStudent && user?.specialty && (
                    <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1 text-gray-700">
                      {user.specialty}
                    </span>
                  )}
                </div>
                {!isStudent && user?.bio && (
                  <p className="text-gray-600 mt-3 max-w-2xl">{user.bio}</p>
                )}
              </div>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {isStudent && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Courses Enrolled" value={stats.enrolled} icon="📚" />
            <StatCard title="Courses Completed" value={stats.completed} icon="🏆" />
            <StatCard title="Total Learning Hours" value={Math.round(stats.totalHours)} icon="⏱️" />
            <StatCard title="Certificates Earned" value={stats.certificates} icon="🎓" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Courses & Progress</h2>
            {enrollments.length === 0 ? (
              <EmptyEnrollments />
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrollments.map(({ id, courseId, course, progress = 0 }) => {
                  const completed = isCourseCompleted(courseId);
<<<<<<< HEAD
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
=======
                  const p = completed ? 100 : progress || 0;
                  return (
                    <div key={id || courseId} className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg">
                      <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
                        {course.image ? (
                          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                        ) : (
                          <span className="text-gray-400 text-4xl absolute inset-0 grid place-items-center">🎓</span>
                        )}
                        {completed && (
<<<<<<< HEAD
                          <span className="absolute right-2 top-2 rounded-full bg-green-500 text-white text-xs px-2 py-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
=======
                          <span className="absolute right-2 top-2 rounded-full bg-green-600 text-white text-xs px-2 py-1">
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="p-5">
<<<<<<< HEAD
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
=======
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Instructor:{" "}
                          <span className="font-medium text-gray-900">
                            {typeof course.instructor === "string" ? course.instructor : course.instructor?.name || "Unknown"}
                          </span>
                        </p>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span className="font-medium">{p === 100 ? "Completed ✅" : "In Progress"}</span>
                            <span className="font-semibold">Progress: {p}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${p === 100 ? "bg-green-500" : "bg-indigo-600"}`}
                              style={{ width: `${p}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/courses/${course.id}`}
                            className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-2.5 hover:bg-indigo-700 font-medium text-sm"
                          >
                            Continue Learning
                          </Link>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleProgressUpdate(courseId, Math.min(100, p + 10))}
                              disabled={p >= 100}
                              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                            >
                              +10%
                            </button>
                            <button
                              onClick={() => {
<<<<<<< HEAD
                                if (completed) {
                                  // Unmark completion (set progress to 99%)
                                  updateEnrollmentProgress(courseId, 99);
                                  unmarkCourseCompleted(courseId);
                                  setRefreshKey(k => k + 1);
=======
                                if (p === 100) {
                                  updateEnrollmentProgress(courseId, 99);
                                  unmarkCourseCompleted(courseId);
                                  setRefreshKey((k) => k + 1);
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                                } else {
                                  handleProgressUpdate(courseId, 100);
                                }
                              }}
                              className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium ${
<<<<<<< HEAD
                                completed
=======
                                p === 100
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                                  ? "border-green-300 text-green-700 bg-green-50 hover:bg-green-100"
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
<<<<<<< HEAD
                              {completed ? "Mark Incomplete" : "Mark as Completed"}
=======
                              {p === 100 ? "Mark Incomplete" : "Mark Completed"}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
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
<<<<<<< HEAD

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
=======
        </>
      )}

      {!isStudent && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Your Courses" value={instructorCourses.length} icon="📘" />
            <StatCard
              title="Total Students"
              value={instructorCourses.reduce((s, c) => s + (c.students || 0), 0)}
              icon="👥"
            />
            <StatCard
              title="Average Rating"
              value={
                instructorCourses.length
                  ? (instructorCourses.reduce((s, c) => s + (c.rating || 0), 0) / instructorCourses.length).toFixed(1)
                  : 0
              }
              icon="⭐"
            />
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Your Courses</h2>
              <div className="flex gap-3">
                <Link to="/manage" className="px-4 py-2 rounded-xl bg-black text-white hover:bg-black/90">
                  Manage Courses
                </Link>
                <Link to="/courses" className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200">
                  Browse Catalog
                </Link>
              </div>
            </div>

            {instructorCourses.length === 0 ? (
              <p className="text-gray-600">You don’t have courses yet. Go to “Manage Courses” to create one.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {instructorCourses.map((c) => (
                  <div key={c.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
                    <div className="aspect-video bg-gray-100">
                      {c.image ? (
                        <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-3xl">📘</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>{c.category}</span>
                        <span>⭐ {c.rating}</span>
                      </div>
                      <h3 className="font-semibold line-clamp-2">{c.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                        <span>👥 {c.students?.toLocaleString?.() ?? c.students}</span>
                        <Link to={`/courses/${c.id}`} className="text-indigo-600 hover:underline">
                          View
                        </Link>
                      </div>
                    </div>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  </div>
                ))}
              </div>
            )}
          </div>
<<<<<<< HEAD
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
=======
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center md:justify-center">
          <form
            onSubmit={saveEdit}
            className="w-full md:max-w-xl bg-white rounded-t-2xl md:rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Edit Profile</h3>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
              />

              {role === "instructor" && (
                <>
                  <Field
                    label="Specialty"
                    value={form.specialty}
                    onChange={(v) => setForm((f) => ({ ...f, specialty: v }))}
                    placeholder="Web Development, AI, Design…"
                  />
                  <Field
                    label="Years of Experience"
                    type="number"
                    min="0"
                    value={form.yearsOfExperience}
                    onChange={(v) => setForm((f) => ({ ...f, yearsOfExperience: v }))}
                  />
                  <Field
                    label="Bio"
                    as="textarea"
                    value={form.bio}
                    onChange={(v) => setForm((f) => ({ ...f, bio: v }))}
                    placeholder="Tell students about your background…"
                  />
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-black/90"
              >
                Save Changes
              </button>
            </div>
          </form>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
        </div>
      )}
    </section>
  );
}
<<<<<<< HEAD
=======

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600 font-medium">{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function EmptyEnrollments() {
  return (
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
  );
}

function Field({ label, as = "input", type = "text", value, onChange, ...rest }) {
  const Cmp = as;
  return (
    <label className="block text-sm">
      <span className="block mb-1 font-medium text-gray-800">{label}</span>
      <Cmp
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 ${
          as === "textarea" ? "min-h-[110px]" : ""
        }`}
        {...rest}
      />
    </label>
  );
}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
