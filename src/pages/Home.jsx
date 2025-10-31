import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">CTMS up & running 🚀</h1>
      <p className="text-gray-600">Browse and manage course tutorials using mock data.</p>
      <div className="flex gap-3">
        <Link to="/courses" className="px-4 py-2 rounded-lg bg-blue-600 text-white">View Courses</Link>
        <Link to="/manage" className="px-4 py-2 rounded-lg border">Instructor Manage</Link>
      </div>
    </section>
  )
}
