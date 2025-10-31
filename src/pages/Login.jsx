import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !pwd) return setErr("Please enter both email and password.");

    const ok = await login(email, pwd);      // updates context + localStorage
    if (!ok) return setErr("Invalid credentials. Try student1@example.com / 123456 or instructor1@example.com / 123456");

    const user = JSON.parse(localStorage.getItem("ctms_user"));
    if (user?.role === "student") nav("/enrollments");
    else if (user?.role === "instructor") nav("/manage");
    else nav("/profile");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid place-items-center">
        <div className="w-full max-w-lg rounded-2xl border bg-white shadow-sm p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border">🎓</span>
            <div className="text-xl font-semibold">LearnHub</div>
          </div>

          <h1 className="text-2xl font-bold mt-6">Welcome back</h1>
          <p className="text-gray-600 mt-1">Enter your credentials to access your account</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <a href="#" className="text-sm text-gray-600 hover:underline">Forgot password?</a>
              </div>
              <input
                id="password" type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Enter your password"
              />
            </div>

            {err && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-2">{err}</div>}

            <button className="w-full rounded-xl bg-black text-white py-2.5 hover:bg-black/90">Sign in</button>
          </form>

          <div className="mt-6 text-xs text-gray-600">
            <div className="uppercase tracking-wider text-gray-500 mb-2">Demo accounts</div>
            <div className="rounded-xl bg-gray-50 p-3 space-y-1">
              <div>Student: <code>student1@example.com</code></div>
              <div>Instructor: <code>instructor1@example.com</code></div>
              <div>Password: <code>123456</code></div>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            Don&apos;t have an account? <Link to="/register" className="underline">Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
