import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    // simulate auth success
    alert('Logged in (mock)')
    nav('/profile')
  }

  return (
    <section className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded-lg px-3 py-2" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="w-full border rounded-lg px-3 py-2" name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white">Login</button>
      </form>
      <p className="text-sm text-gray-600">No account? <Link className="text-blue-600 underline" to="/register">Register</Link></p>
    </section>
  )
}
