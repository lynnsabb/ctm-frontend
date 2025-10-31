import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border">🎓</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">LearnHub</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Welcome back — browse, enroll, and manage course tutorials using mock data.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/courses" className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-black/90">View Courses</Link>
          <Link to="/manage" className="px-5 py-2.5 rounded-xl border hover:bg-gray-50">Instructor Manage</Link>
        </div>
      </div>
    </section>
  )
}
