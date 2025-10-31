// src/pages/CourseDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useAuth } from "../state/auth.jsx";
import {
  getCourseById,
  getEnrollments,
  enroll,
  removeEnrollment,
  isCourseCompleted,
  markCourseCompleted,
  unmarkCourseCompleted,
} from "../data/mock";

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const course = getCourseById(id);
  const [enrolledIds, setEnrolledIds] = useState(() => getEnrollments());
  const [done, setDone] = useState(isCourseCompleted(id));

  const isStudent = user?.role === "student";
  const isInstructor = user?.role === "instructor";

  const isEnrolled = useMemo(
    () => (isStudent ? enrolledIds.includes(id) : false),
    [enrolledIds, id, isStudent]
  );

  const toggleEnroll = () => {
    if (!isStudent) return; // only students can enroll
    if (isEnrolled) removeEnrollment(id);
    else enroll(id);
    setEnrolledIds(getEnrollments());
  };

  const toggleDone = () => {
    if (!isStudent) return; // only students can complete
    if (done) unmarkCourseCompleted(id);
    else markCourseCompleted(id);
    setDone(!done);
  };

  if (!course) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-semibold">Course not found</h1>
        <Link to="/courses" className="text-blue-600 underline">Back to Courses</Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-sm text-gray-500">
            {course.category} • {course.level} • Instructor: {course.instructor}
          </p>
        </div>

        {/* Actions (role-aware) */}
        <div className="flex gap-2">
          {!user && (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90"
            >
              Log in to enroll
            </Link>
          )}

          {isInstructor && (
            <span className="px-4 py-2 rounded-lg border text-gray-600">
              Instructor view
            </span>
          )}

          {isStudent && (
            <>
              <button
                onClick={toggleEnroll}
                className={
                  "px-4 py-2 rounded-lg " +
                  (isEnrolled
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-600 text-white hover:bg-blue-700")
                }
              >
                {isEnrolled ? "Unenroll" : "Enroll"}
              </button>

              <button
                onClick={toggleDone}
                className={
                  "px-4 py-2 rounded-lg border text-sm " +
                  (done
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50")
                }
                title={done ? "Unmark as completed" : "Mark as completed"}
              >
                {done ? "✅ Completed" : "Mark as Completed"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p>{course.description}</p>

      {/* Modules & lessons */}
      <div className="space-y-4">
        {course.modules?.map((m) => (
          <div key={m.id} className="rounded-xl border p-4">
            <h3 className="font-semibold">{m.title}</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {m.lessons?.map((l) => (
                <li key={l.id}>{l.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link to="/courses" className="inline-block mt-2 text-blue-600 underline">
        ← Back to Courses
      </Link>
    </section>
  );
}
