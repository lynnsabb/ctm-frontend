import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    alert('Registered (mock)')
    nav('/login')
  }

  return (
    <section className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded-lg px-3 py-2" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input className="w-full border rounded-lg px-3 py-2" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="w-full border rounded-lg px-3 py-2" name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white">Create account</button>
      </form>
      <p className="text-sm text-gray-600">Already have an account? <Link className="text-blue-600 underline" to="/login">Login</Link></p>
    </section>
  )
}
