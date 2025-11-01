import { useState, useMemo } from "react";

// Icons
function IconArrowLeft(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>); }
function IconStar(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" /></svg>); }
function IconUsers(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>); }
function IconClock(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>); }
function IconBook(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" /></svg>); }
function IconChevronDown(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>); }
function IconGlobe(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2C6.47 2 2 6.48 2 12s4.47 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>); }
function IconCertificate(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" /></svg>); }
function IconCheckCircle(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>); }

export default function CourseDetails({ course, onBack }) {
  const [expandedModule, setExpandedModule] = useState(null);

  // If a course prop isn’t provided, we use a sensible default.
  const courseData = course ?? {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Build your first websites and master JavaScript essentials.",
    category: "Programming",
    level: "Beginner",
    rating: 4.8,
    students: 4200,
    duration: "35h",
    price: 99.99,
    originalPrice: 149.99,
    language: "English",
    certificate: "Yes",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=600&fit=crop",
    instructor: {
      name: "Jane Doe",
      title: "Senior Frontend Engineer",
      avatar: "https://i.pravatar.cc/150?img=7",
      bio: "10+ years building full-stack apps, passionate about teaching modern web dev.",
      courses: 7,
      students: 25000,
    },
    // <<< These two modules match the screenshot text style
    curriculum: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        description: "Build your first websites",
        topics: [
          { title: "HTML basics & page structure", duration: "12m" },
          { title: "CSS selectors & the box model", duration: "18m" },
          { title: "Layouts: Flexbox & Grid", duration: "22m" },
        ],
      },
      {
        id: 2,
        title: "JavaScript Essentials",
        description: "Master JavaScript programming",
        topics: [
          { title: "Variables, types, and operators", duration: "15m" },
          { title: "Functions & scope", duration: "20m" },
          { title: "DOM basics & events", duration: "25m" },
        ],
      },
    ],
  };

  // Show "Lessons" as total topic count across modules
  const totalLessons = useMemo(
    () =>
      (courseData.curriculum || []).reduce(
        (sum, m) => sum + (m.topics?.length || 0),
        0
      ),
    [courseData.curriculum]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
          >
            <IconArrowLeft />
            <span className="font-medium">Back to Courses</span>
          </button>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full mr-2">
                {courseData.category}
              </span>
              <span className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full">
                {courseData.level}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-4">
                {courseData.title}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {courseData.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <IconStar className="text-yellow-400" />
                <span className="font-semibold text-gray-900">
                  {courseData.rating}
                </span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-1">
                <IconUsers />
                <span className="font-semibold text-gray-900">
                  {courseData.students}
                </span>
                <span>students</span>
              </div>
              <div className="flex items-center gap-1">
                <IconClock />
                <span className="font-semibold text-gray-900">
                  {courseData.duration}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IconBook />
                <span className="font-semibold text-gray-900">
                  {totalLessons}
                </span>
                <span>lessons</span>
              </div>
            </div>

            {/* What you'll learn */}
            {courseData.learningPoints?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  What You'll Learn
                </h2>
                {courseData.learningPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 mb-2">
                    <IconCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Curriculum */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Course Curriculum
              </h2>

              {courseData.curriculum.map((mod, idx) => (
                <div key={mod.id} className="border border-gray-200 rounded-lg mb-3">
                  <button
                    onClick={() =>
                      setExpandedModule(expandedModule === mod.id ? null : mod.id)
                    }
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
                  >
                    <div>
                      {/* This line matches the screenshot style */}
                      <h3 className="font-semibold text-gray-900">
                        {`Module ${idx + 1}: ${mod.title}`}
                      </h3>
                      <p className="text-sm text-gray-600">{mod.description}</p>
                    </div>
                    <IconChevronDown
                      className={`text-gray-400 transition-transform ${expandedModule === mod.id ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {expandedModule === mod.id && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      {mod.topics.map((t, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition"
                        >
                          <span className="text-gray-700">{t.title}</span>
                          <span className="text-sm text-gray-500">
                            {t.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About the Instructor
              </h2>
              <div className="flex items-start gap-4">
                <img
                  src={courseData.instructor.avatar}
                  alt={courseData.instructor.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">
                    {courseData.instructor.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {courseData.instructor.title}
                  </p>
                  <p className="text-gray-600 mb-3">{courseData.instructor.bio}</p>
                  <div className="flex gap-8 text-sm">
                    <div>
                      <p className="text-gray-500">Courses</p>
                      <p className="font-semibold text-gray-900">
                        {courseData.instructor.courses}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="font-semibold text-gray-900">
                        {courseData.instructor.students}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-8 overflow-hidden">
              <img
                src={courseData.image}
                alt={courseData.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${courseData.price}
                  </span>
                  {courseData.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${courseData.originalPrice}
                    </span>
                  )}
                </div>
                <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                  Add to Cart
                </button>

                <div className="space-y-3 pt-4 border-t border-gray-200 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">
                      {courseData.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons</span>
                    <span className="font-semibold text-gray-900">
                      {totalLessons}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <IconGlobe className="w-4 h-4" /> {courseData.language}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate</span>
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <IconCertificate className="w-4 h-4" /> {courseData.certificate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
