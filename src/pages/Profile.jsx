import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { currentUser, getEnrollments, removeEnrollment, courses as allCourses } from '../data/mock'

export default function Profile() {
  const [enrolledIds, setEnrolledIds] = useState(() => getEnrollments())
  const enrolledSet = useMemo(() => new Set(enrolledIds), [enrolledIds])
  const enrolledCourses = useMemo(
    () => allCourses.filter(c => enrolledSet.has(c.id)),
    [enrolledIds]
  )

  const onUnenroll = (courseId) => {
    removeEnrollment(courseId)
    setEnrolledIds(getEnrollments())
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="rounded-xl border bg-white p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
            {(currentUser?.name ?? currentUser?.email ?? 'U').slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{currentUser?.name ?? 'Student'}</p>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
            <p className="text-xs text-gray-400 mt-1">User ID: {currentUser?.id}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">My Enrollments</h2>

        {enrolledCourses.length === 0 ? (
          <div className="rounded-lg border bg-white p-4 text-gray-600">
            You’re not enrolled in any courses yet. Browse the{' '}
            <Link to="/courses" className="text-blue-600 underline underline-offset-2">Courses</Link> page.
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map((course) => (
              <li key={course.id} className="rounded-xl border bg-white p-4 flex flex-col gap-3">
                <div className="flex-1">
                  <Link to={`/courses/${course.id}`} className="font-medium hover:underline">
                    {course.title}
                  </Link>
                  <div className="mt-1 text-sm text-gray-500">
                    <div>{course.description}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="inline-block text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">
                        {course.category}
                      </span>
                      <span className="inline-block text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                        {course.level}
                      </span>
                      <span className="inline-block text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                        Instructor: {course.instructor}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {course.modules?.length ?? 0} modules •{' '}
                    {course.modules?.reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0) ?? 0} lessons
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/courses/${course.id}`} className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200">View</Link>
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
    </section>
  )
}
