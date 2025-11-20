import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCourseById,
  isCourseCompleted,
  markCourseCompleted,
  unmarkCourseCompleted,
  getEnrollmentsNormalized,
  mockCourses,
} from "../data/mock";
import { useAuth } from "../state/auth.jsx";

function IconCheckCircle(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
      10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 
      1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

export default function Enrollments() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!user || user.role !== "student") {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-2xl border bg-white p-10 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access denied</h1>
          <p className="text-gray-600 mb-6">This page is only available to students.</p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 hover:bg-black/90"
          >
            Browse Courses
          </Link>
        </div>
      </section>
    );
  }

  const items = useMemo(() => {
    const normalized = getEnrollmentsNormalized();
    return normalized
      .map((e) => {
        const course =
          getCourseById(e.courseId) ||
          mockCourses.find((c) => c.id === Number(e.courseId)) ||
          mockCourses.find((c) => String(c.id) === String(e.courseId));
        return course ? { ...e, course } : null;
      })
      .filter((e) => e !== null);
  }, [refreshKey]);

  const completedCount = items.filter((it) => isCourseCompleted(it.courseId)).length;

  const toggleComplete = (courseId) => {
    if (isCourseCompleted(courseId)) unmarkCourseCompleted(courseId);
    else markCourseCompleted(courseId);
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    const handleStorageChange = () => setRefreshKey((k) => k + 1);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Learning</h1>
        <p className="text-gray-600 text-lg">Track your courses and continue learning</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">Enrolled Courses</div>
            <div className="text-gray-400 text-lg">📘</div>
          </div>
          <div className="text-2xl font-bold mt-2">{items.length}</div>
          <div className="text-xs text-gray-500">Active enrollments</div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">Completed</div>
            <div className="text-gray-400 text-lg">🥇</div>
          </div>
          <div className="text-2xl font-bold mt-2">{completedCount}</div>
          <div className="text-xs text-gray-500">Marked as finished</div>
        </div>
      </div>

      {items.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-2">Your Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map(({ id, courseId, course }) => {
              const done = isCourseCompleted(courseId);
              return (
                <div
                  key={id || courseId}
                  className="group overflow-hidden rounded-2xl border bg-white transition-all hover:shadow-lg"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-3xl absolute inset-0 grid place-items-center">
                        🎓
                      </span>
                    )}
                    {done && (
                      <span className="absolute right-2 top-2 rounded-full bg-emerald-600 text-white text-xs px-2 py-0.5 flex items-center gap-1">
                        <IconCheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-2">
                      <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2.5 py-0.5 text-xs">
                        {course.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                      {course.description}
                    </p>

                    <div className="mt-3 mb-3">
                      {done ? (
                        <span className="inline-flex items-center text-emerald-600 text-sm font-medium gap-1">
                          ✅ Completed
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm italic">
                          Not completed yet
                        </span>
                      )}
                    </div>

                    {course.instructor && (
                      <p className="text-xs text-gray-500 mb-3">
                        Instructor:{" "}
                        <span className="font-medium text-gray-700">
                          {typeof course.instructor === "string"
                            ? course.instructor
                            : course.instructor?.name || "Unknown"}
                        </span>
                      </p>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/courses/${course.id}`}
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 hover:bg-black/90"
                      >
                        {done ? "Review Course" : "Start Course"}
                      </Link>

                      <button
                        onClick={() => toggleComplete(courseId)}
                        className={
                          "inline-flex items-center justify-center rounded-xl px-4 py-2 border " +
                          (done
                            ? "border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50")
                        }
                      >
                        {done ? "Completed" : "Mark done"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border bg-white p-12 text-center">
          <div className="text-5xl mb-3">📘</div>
          <h3 className="text-xl font-semibold mb-2">No Enrollments Yet</h3>
          <p className="text-gray-600 mb-6">
            You haven't enrolled in any courses yet. Browse our catalog to start learning!
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 hover:bg-black/90"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </section>
  );
}
