import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchCourses, getCourses } from '../data/mock'

export default function Courses() {
  const all = getCourses()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(all.map(c => c.category))]
  const filtered = useMemo(() => searchCourses(q, category), [q, category])

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">All Courses</h1>
      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Search..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <Link key={c.id} to={`/courses/${c.id}`} className="block rounded-xl border p-4 hover:shadow">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.category} • {c.level}</p>
            <p className="mt-2 line-clamp-2 text-sm">{c.description}</p>
          </Link>
        ))}
        {!filtered.length && <p className="text-gray-500">No courses match your search.</p>}
      </div>
    </section>
  )
}
