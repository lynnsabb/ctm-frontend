import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEnrollments, removeEnrollment, getCourseById } from '../data/mock'

export default function Enrollments() {
  const [ids, setIds] = useState(() => getEnrollments())
  useEffect(() => {
    const onStorage = () => setIds(getEnrollments())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const unenroll = (id) => {
    removeEnrollment(id)
    setIds(getEnrollments())
  }

  const items = ids.map(getCourseById).filter(Boolean)

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">My Enrollments</h1>

      {!items.length ? (
        <div className="rounded-lg border p-4 text-gray-600">
          You have no enrollments yet. Browse the{' '}
          <Link to="/courses" className="text-blue-600 underline">Courses</Link> page.
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(c => (
            <li key={c.id} className="rounded-xl border p-4">
              <Link to={`/courses/${c.id}`} className="font-medium hover:underline">{c.title}</Link>
              <p className="text-sm text-gray-500">{c.category} • {c.level}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/courses/${c.id}`} className="px-3 py-1.5 rounded-lg text-sm bg-gray-100">View</Link>
                <button onClick={() => unenroll(c.id)} className="px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-600">
                  Unenroll
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
