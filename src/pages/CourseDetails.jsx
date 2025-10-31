import { useParams, Link } from 'react-router-dom'
import { getCourseById, enroll, getEnrollments, removeEnrollment } from '../data/mock'
import { useMemo, useState } from 'react'

export default function CourseDetails() {
  const { id } = useParams()
  const course = getCourseById(id)
  const [enrolledIds, setEnrolledIds] = useState(() => getEnrollments())

  const isEnrolled = useMemo(() => enrolledIds.includes(id), [enrolledIds, id])

  const toggleEnroll = () => {
    if (isEnrolled) {
      removeEnrollment(id)
    } else {
      enroll(id)
    }
    setEnrolledIds(getEnrollments())
  }

  if (!course) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-semibold">Course not found</h1>
        <Link to="/courses" className="text-blue-600 underline">Back to Courses</Link>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-sm text-gray-500">
            {course.category} • {course.level} • Instructor: {course.instructor}
          </p>
        </div>
        <button
          onClick={toggleEnroll}
          className={'px-4 py-2 rounded-lg ' + (isEnrolled ? 'bg-red-50 text-red-600' : 'bg-blue-600 text-white')}
        >
          {isEnrolled ? 'Unenroll' : 'Enroll'}
        </button>
      </div>

      <p>{course.description}</p>

      <div className="space-y-4">
        {course.modules?.map(m => (
          <div key={m.id} className="rounded-xl border p-4">
            <h3 className="font-semibold">{m.title}</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {m.lessons?.map(l => <li key={l.id}>{l.title}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <Link to="/courses" className="inline-block mt-2 text-blue-600 underline">← Back to Courses</Link>
    </section>
  )
}
