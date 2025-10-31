import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="space-y-3 text-center py-24">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="inline-block mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white">Back home</Link>
    </section>
  )
}
