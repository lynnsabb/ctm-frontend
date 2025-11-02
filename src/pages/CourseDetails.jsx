import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { mockCourses } from "../data/mock";

// Icons
function IconArrowLeft(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>); }
function IconStar(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" /></svg>); }
function IconUsers(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0C9.66 11 11 9.66 11 8S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C18 14.17 13.33 13 11 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5C26 14.17 21.33 13 19 13z" /></svg>); }
function IconClock(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg>); }
function IconBook(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" /></svg>); }
function IconChevronDown(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" /></svg>); }
function IconGlobe(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2C6.47 2 2 6.48 2 12s4.47 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>); }
function IconCertificate(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" /></svg>); }
function IconCheckCircle(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>); }

export default function CourseDetails({ course: courseProp, onBack }) {
  const { id: idParam } = useParams(); // support /courses/:id
  const paramId = idParam ? Number(idParam) : undefined;

  // Prefer prop; else find by route param; else null
  const fromMock = mockCourses.find(c => c.id === paramId) || null;
  const base = courseProp || fromMock;

  // Fallback defaults if some fields aren’t in the mock
  const defaultCurriculum = [
    {
      id: 1,
      title: "Getting Started",
      description: "First steps and setup",
      topics: [
        { title: "Introduction & goals", duration: "8m" },
        { title: "Tools & environment", duration: "14m" },
      ],
    },
    {
      id: 2,
      title: "Core Concepts",
      description: "Build real understanding",
      topics: [
        { title: "Key primitives", duration: "18m" },
        { title: "Project walkthrough", duration: "22m" },
      ],
    },
  ];

  // Compose a course object that the UI expects
  const courseData = {
    id: base?.id ?? 0,
    title: base?.title ?? "Course Title",
    description: base?.description ?? "Course description goes here.",
    category: base?.category ?? "General",
    level: base?.level ?? "Beginner",
    rating: base?.rating ?? 4.7,
    students: base?.students ?? 1200,
    duration: base?.duration ?? "20h",
    language: "English",
    certificate: "Yes",
    image: base?.image ?? "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=600&fit=crop",
    instructor: {
      name: (base && base.instructor) || "Instructor",
      title: "Senior Instructor",
      avatar: "https://i.pravatar.cc/150?img=12",
      bio: "Passionate educator with real-world experience.",
      courses: 7,
      students: 25000,
    },
    curriculum: base?.curriculum || defaultCurriculum,
    learningPoints: base?.learningPoints || [
      "Understand the fundamentals and best practices",
      "Build confidence with hands-on exercises",
      "Apply skills to small projects",
    ],
  };

  // Total lessons from curriculum topics
  const totalLessons = useMemo(
    () => (courseData.curriculum || []).reduce((sum, m) => sum + (m.topics?.length || 0), 0),
    [courseData.curriculum]
  );

  const [expandedModule, setExpandedModule] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
          >
            <IconArrowLeft />
            <span className="font-medium">Back to Courses</span>
          </button>
        ) : (
          <Link to="/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition">
            <IconArrowLeft />
            <span className="font-medium">Back to Courses</span>
          </Link>
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
              <h1 className="text-4xl font-bold text-gray-900 mt-4">{courseData.title}</h1>
              <p className="text-lg text-gray-600 mt-2">{courseData.description}</p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <IconStar className="text-yellow-400" />
                <span className="font-semibold text-gray-900">{courseData.rating}</span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-1">
                <IconUsers />
                <span className="font-semibold text-gray-900">{courseData.students.toLocaleString?.() ?? courseData.students}</span>
                <span>students</span>
              </div>
              <div className="flex items-center gap-1">
                <IconClock />
                <span className="font-semibold text-gray-900">{courseData.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconBook />
                <span className="font-semibold text-gray-900">{totalLessons}</span>
                <span>lessons</span>
              </div>
            </div>

            {/* What you'll learn */}
            {courseData.learningPoints?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
              {courseData.curriculum.map((mod, idx) => (
                <div key={mod.id ?? idx} className="border border-gray-200 rounded-lg mb-3">
                  <button
                    onClick={() => setExpandedModule(expandedModule === (mod.id ?? idx) ? null : (mod.id ?? idx))}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{`Module ${idx + 1}: ${mod.title}`}</h3>
                      {mod.description && <p className="text-sm text-gray-600">{mod.description}</p>}
                    </div>
                    <IconChevronDown className={`text-gray-400 transition-transform ${expandedModule === (mod.id ?? idx) ? "rotate-180" : ""}`} />
                  </button>

                  {expandedModule === (mod.id ?? idx) && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      {(mod.topics || []).map((t, i) => (
                        <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition">
                          <span className="text-gray-700">{t.title}</span>
                          {t.duration && <span className="text-sm text-gray-500">{t.duration}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Instructor</h2>
              <div className="flex items-start gap-4">
                <img src={courseData.instructor.avatar} alt={courseData.instructor.name} className="w-20 h-20 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">{courseData.instructor.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{courseData.instructor.title}</p>
                  <p className="text-gray-600 mb-3">{courseData.instructor.bio}</p>
                  <div className="flex gap-8 text-sm">
                    <div>
                      <p className="text-gray-500">Courses</p>
                      <p className="font-semibold text-gray-900">{courseData.instructor.courses}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="font-semibold text-gray-900">{courseData.instructor.students.toLocaleString?.() ?? courseData.instructor.students}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Info only (NO price / NO Add to Cart) */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-8 overflow-hidden">
              <img src={courseData.image} alt={courseData.title} className="w-full h-64 object-cover" />
              <div className="p-6 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">{courseData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons</span>
                    <span className="font-semibold text-gray-900">{totalLessons}</span>
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

                {/* Optional: CTA to go to the first module */}
                <Link
                  to="/courses"
                  className="w-full inline-flex justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Browse More Courses
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
