// src/pages/ManageCourse.jsx
import { useState } from "react";
import { getCourses } from "../data/mock";

export default function ManageCourse() {
  // Local copy to simulate CRUD (non-persistent)
  const [list, setList] = useState(() => getCourses());
  const [draft, setDraft] = useState({
    title: "",
    level: "Beginner",
    category: "Frontend",
    description: "",
    instructor: "",
  });

  const onChange = (e) =>
    setDraft((d) => ({ ...d, [e.target.name]: e.target.value }));

  const addCourse = (e) => {
    e.preventDefault();
    const id =
      draft.title.toLowerCase().replace(/\s+/g, "-").slice(0, 24) ||
      `c-${Date.now()}`;
    const newCourse = { id, modules: [], ...draft };
    setList((prev) => [newCourse, ...prev]);
    setDraft({
      title: "",
      level: "Beginner",
      category: "Frontend",
      description: "",
      instructor: "",
    });
  };

  const removeCourse = (id) =>
    setList((prev) => prev.filter((c) => c.id !== id));

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Courses</h1>
          <p className="text-sm text-gray-600 mt-1">
            Add new courses or remove existing ones. (Mock data — local only)
          </p>
        </div>
      </header>

      {/* Form Card */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h2 className="font-semibold">Add a new course</h2>
        </div>

        <form onSubmit={addCourse} className="p-5 grid gap-5 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={draft.title}
              onChange={onChange}
              required
              placeholder="e.g., Advanced React Patterns"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <select
              name="level"
              value={draft.level}
              onChange={onChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={draft.category}
              onChange={onChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option>Frontend</option>
              <option>Backend</option>
              <option>Language</option>
            </select>
          </div>

          {/* Instructor */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Instructor</label>
            <input
              name="instructor"
              value={draft.instructor}
              onChange={onChange}
              placeholder="e.g., Jane Doe"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={3}
              name="description"
              value={draft.description}
              onChange={onChange}
              placeholder="Short summary of what students will learn…"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button className="inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2.5 hover:bg-black/90 transition">
              Add Course
            </button>
          </div>
        </form>
      </div>

      {/* Course Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Existing Courses</h2>
          <span className="text-sm text-gray-500">{list.length} total</span>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li
              key={c.id}
              className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold line-clamp-2">{c.title}</div>
                    <div className="mt-1 text-xs text-gray-600 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5">
                        {c.category}
                      </span>
                      <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5">
                        {c.level}
                      </span>
                    </div>
                  </div>
                </div>

                {c.instructor && (
                  <div className="mt-2 text-sm text-gray-700">
                    Instructor: <span className="font-medium">{c.instructor}</span>
                  </div>
                )}

                <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                  {c.description || "No description provided."}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400 truncate">ID: {c.id}</span>
                  <button
                    onClick={() => removeCourse(c.id)}
                    className="rounded-lg bg-red-50 text-red-600 px-3 py-1.5 text-sm hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
