// src/pages/Profile.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  currentUser,
  getEnrollments,
  removeEnrollment,
  courses as allCourses,
  getSessionUser, // from mock auth (fallback)
} from "../data/mock";
import { useAuth } from "../state/auth.jsx";

export default function Profile() {
  // who is logged in?
  const { user: ctxUser } = useAuth?.() || { user: null };
  const user = ctxUser ?? getSessionUser?.() ?? currentUser;

  const role = user?.role ?? "student"; // default student for backward compat
  const isStudent = role === "student";
  const isInstructor = role === "instructor";

  // student enrollments (only used if student)
  const [enrolledIds, setEnrolledIds] = useState(() => getEnrollments());
  const enrolledSet = useMemo(() => new Set(enrolledIds), [enrolledIds]);
  const enrolledCourses = useMemo(
    () => allCourses.filter((c) => enrolledSet.has(c.id)),
    [enrolledIds]
  );

  const onUnenroll = (courseId) => {
    removeEnrollment(courseId);
    setEnrolledIds(getEnrollments());
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* User card */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
            {(user?.name ?? user?.email ?? "U").slice(0, 1).toUpperCase()}
          </div>
        </div>
        <div className="mt-3">
          <p className="font-medium">{user?.name ?? "User"}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
            <span>User ID: {user?.id ?? "u?"}</span>
            <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-gray-700">
              Role: {role}
            </span>
          </div>
        </div>
      </div>

      {/* Instructor view */}
      {isInstructor && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Instructor Tools</h2>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">
              As an instructor, you can create and curate courses.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
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

      {/* Student view: My Enrollments */}
      {isStudent && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">My Enrollments</h2>

          {enrolledCourses.length === 0 ? (
            <div className="rounded-2xl border bg-white p-5 shadow-sm text-gray-600">
              You’re not enrolled in any courses yet. Browse the{" "}
              <Link
                to="/courses"
                className="text-black underline underline-offset-2"
              >
                Courses
              </Link>{" "}
              page.
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledCourses.map((course) => (
                <li
                  key={course.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/courses/${course.id}`}
                      className="font-medium hover:underline line-clamp-2"
                    >
                      {course.title}
                    </Link>

                    <div className="mt-1 text-sm text-gray-600">
                      <div className="line-clamp-2">{course.description}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="inline-block text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-700">
                          {course.category}
                        </span>
                        <span className="inline-block text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700">
                          {course.level}
                        </span>
                        <span className="inline-block text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700">
                          Instructor: {typeof course.instructor === 'string' 
                            ? course.instructor 
                            : course.instructor?.name || 'Unknown'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      {course.modules?.length ?? 0} modules •{" "}
                      {course.modules?.reduce(
                        (sum, m) => sum + (m.lessons?.length ?? 0),
                        0
                      ) ?? 0}{" "}
                      lessons
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/courses/${course.id}`}
                      className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => onUnenroll(course.id)}
                      className="px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Unenroll
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
