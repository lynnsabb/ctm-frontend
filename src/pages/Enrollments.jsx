import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getEnrollments,
  getCourseById,
  isCourseCompleted,
  markCourseCompleted,
  unmarkCourseCompleted,
} from "../data/mock";
import { useAuth } from "../state/auth.jsx";

export default function Enrollments() {
  const { user } = useAuth();
  const [, force] = useState(0); // quick refresh after complete/uncomplete

  if (!user || user.role !== "student") {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-2xl border bg-white p-10 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access denied</h1>
          <p className="text-gray-600 mb-6">This page is only available to students.</p>
          <Link to="/courses" className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 hover:bg-black/90">
            Browse Courses
          </Link>
        </div>
      </section>
    );
  }

  const items = useMemo(() => {
    const raw = getEnrollments();
    return raw
      .map((e, i) => (typeof e === "string" ? { id: `e${i}`, courseId: e } : e))
      .map((e) => ({ ...e, course: getCourseById(e.courseId) }))
      .filter((e) => e.course);
  }, []);

  const completedCount = items.filter((it) => isCourseCompleted(it.courseId)).length;

  const toggleComplete = (courseId) => {
    if (isCourseCompleted(courseId)) unmarkCourseCompleted(courseId);
    else markCourseCompleted(courseId);
    force((n) => n + 1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Learning</h1>
        <p className="text-gray-600 text-lg">Track your courses and continue learning</p>
      </div>

      {/* Simple stats (no average, no lessons) */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">Enrolled Courses</div>
            <div className="text-gray-400">📚</div>
          </div>
          <div className="text-2xl font-bold mt-2">{items.length}</div>
          <div className="text-xs text-gray-500">Active enrollments</div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 font-medium">Completed</div>
            <div className="text-gray-400">🏆</div>
          </div>
          <div className="text-2xl font-bold mt-2">{completedCount}</div>
          <div className="text-xs text-gray-500">Marked as finished</div>
        </div>
      </div>

      {/* Enrolled courses */}
      {items.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map(({ id, courseId, course }) => {
              const done = isCourseCompleted(courseId);
              return (
                <div key={id || courseId} className="group overflow-hidden rounded-2xl border bg-white transition-all hover:shadow-lg">
                  <div className="aspect-video bg-gray-100 grid place-items-center relative">
                    <span className="text-gray-400 text-3xl">🎓</span>
                    {done && (
                      <span className="absolute right-2 top-2 rounded-full bg-emerald-600 text-white text-xs px-2 py-0.5">
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
                    <h3 className="font-semibold text-lg leading-snug line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">{course.description}</p>

                    <div className="mt-4 flex gap-2">
                      {/* Start/Continue → Course Details */}
                      <Link
                        to={`/courses/${course.id}`}
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 hover:bg-black/90"
                      >
                        {done ? "Review Course" : "Start Course"}
                      </Link>

                      {/* Mark complete toggle */}
                      <button
                        onClick={() => toggleComplete(courseId)}
                        className={
                          "inline-flex items-center justify-center rounded-xl px-4 py-2 border " +
                          (done
                            ? "border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50")
                        }
                        title={done ? "Unmark as completed" : "Mark as completed"}
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
          <div className="text-5xl mb-3">📚</div>
          <h3 className="text-xl font-semibold mb-2">No Enrollments Yet</h3>
          <p className="text-gray-600 mb-6">Start learning by enrolling in a course.</p>
          <Link to="/courses" className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 hover:bg-black/90">
            Browse Courses
          </Link>
        </div>
      )}
    </section>
  );
}
