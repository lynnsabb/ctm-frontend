import { useState } from 'react'
import { courses as seed, getCourses } from '../data/mock'

export default function ManageCourse() {
  // local copy to simulate CRUD (non-persistent)
  const [list, setList] = useState(() => getCourses())
  const [draft, setDraft] = useState({ title: '', level: 'Beginner', category: 'Frontend', description: '', instructor: '' })

  const onChange = e => setDraft(d => ({ ...d, [e.target.name]: e.target.value }))

  const addCourse = (e) => {
    e.preventDefault()
    const id = draft.title.toLowerCase().replace(/\s+/g, '-').slice(0, 24) || `c-${Date.now()}`
    const newCourse = { id, modules: [], ...draft }
    setList(prev => [newCourse, ...prev])
    setDraft({ title: '', level: 'Beginner', category: 'Frontend', description: '', instructor: '' })
  }

  const removeCourse = (id) => setList(prev => prev.filter(c => c.id !== id))

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Courses (Mock)</h1>

      <form onSubmit={addCourse} className="grid gap-3 sm:grid-cols-2">
        <input className="border rounded-lg px-3 py-2 sm:col-span-2" name="title" placeholder="Title" value={draft.title} onChange={onChange} required />
        <select className="border rounded-lg px-3 py-2" name="level" value={draft.level} onChange={onChange}>
          <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <select className="border rounded-lg px-3 py-2" name="category" value={draft.category} onChange={onChange}>
          <option>Frontend</option><option>Backend</option><option>Language</option>
        </select>
        <input className="border rounded-lg px-3 py-2 sm:col-span-2" name="instructor" placeholder="Instructor" value={draft.instructor} onChange={onChange} />
        <textarea className="border rounded-lg px-3 py-2 sm:col-span-2" rows="3" name="description" placeholder="Description" value={draft.description} onChange={onChange} />
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white sm:col-span-2">Add Course</button>
      </form>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(c => (
          <li key={c.id} className="rounded-xl border p-4">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-gray-500">{c.category} • {c.level}</div>
            <p className="mt-2 text-sm line-clamp-2">{c.description}</p>
            <button onClick={() => removeCourse(c.id)} className="mt-3 px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-600">Remove</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
