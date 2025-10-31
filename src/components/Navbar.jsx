import { Link, NavLink } from 'react-router-dom'

const link = ({ isActive }) =>
  'px-3 py-2 rounded-lg text-sm ' +
  (isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100')

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">
        <Link to="/" className="font-semibold">CTMS</Link>
        <div className="flex items-center gap-2">
          <NavLink to="/courses" className={link}>Courses</NavLink>
          <NavLink to="/enrollments" className={link}>Enrollments</NavLink>
          <NavLink to="/profile" className={link}>Profile</NavLink>
          <NavLink to="/manage" className={link}>Manage</NavLink>
          <NavLink to="/login" className={link}>Login</NavLink>
          <NavLink to="/register" className={link}>Register</NavLink>
        </div>
      </nav>
    </header>
  )
}
