

// src/pages/CourseDetails.jsx

import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockCourses, enrollWithStructure, getEnrollmentsNormalized, getSessionUser } from "../data/mock";
import { useAuth } from "../state/auth.jsx";

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

import { instructors as instructorsList } from "../data/mock";

function IconArrowLeft(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>) }
function IconStar(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" /></svg>) }
function IconUsers(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0C9.66 11 11 9.66 11 8S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C18 14.17 13.33 13 11 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5C26 14.17 21.33 13 19 13z" /></svg>) }
function IconClock(props) { return (<svg viewBox="0 0 24 24" width="16" height="16" {...props}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg>) }
function IconBook(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" /></svg>) }
function IconChevronDown(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" /></svg>) }
function IconGlobe(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2C6.47 2 2 6.48 2 12s4.47 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>) }
function IconCertificate(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" /></svg>) }
function IconCheckCircle(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>) }
function IconPlayCircle(props) { return (<svg viewBox="0 0 24 24" width="20" height="20" {...props}><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>) }

export default function CourseDetails({ course: courseProp, onBack }) {
  const { id: idParam } = useParams();

  const paramId = idParam ? Number(idParam) : undefined;
  const navigate = useNavigate();
  const { user } = useAuth() || { user: null };


  // Prefer prop; else find by route param; else null
  const fromMock = mockCourses.find(c => c.id === paramId) || null;
  const base = courseProp || fromMock;

  // Toast state
  const [showToast, setShowToast] = useState(false);

  // Fallback defaults if some fields aren't in the mock
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

  const fromMock = mockCourses.find(c => c.id === paramId) || null;
  const base = courseProp || fromMock;

  const [showToast, setShowToast] = useState(false);

  const defaultCurriculum = [
    { id: 1, title: "Getting Started", description: "First steps and setup", topics: [{ id: 1, title: "Introduction & goals", duration: "8m" }, { id: 2, title: "Tools & environment", duration: "14m" }] },
    { id: 2, title: "Core Concepts", description: "Build real understanding", topics: [{ id: 3, title: "Key primitives", duration: "18m" }, { id: 4, title: "Project walkthrough", duration: "22m" }] }
  ];

  const resolveInstructor = () => {
    if (!base) return null;

    if (base.instructorId) {
      const byId = instructorsList.find(i => String(i.id) === String(base.instructorId));
      if (byId) return byId;
    }

    if (typeof base.instructor === "object" && base.instructor) {
      const name = base.instructor.name || "Instructor";
      const photo = base.instructor.photo || base.instructor.image || base.instructor.avatar;
      const specialty = base.instructor.specialty || base.instructor.role || "Senior Instructor";
      const students = base.instructor.students || base.instructor.studentsTaught || 25000;
      const coursesTaught = base.instructor.courses || base.instructor.coursesTaught || 7;
      const bio = base.instructor.bio || base.instructor.experience || "Passionate educator with real-world experience.";
      return { name, photo, specialty, students, courses: coursesTaught, bio };
    }

    if (typeof base.instructor === "string") {
      const byName = instructorsList.find(i => i.name.toLowerCase() === base.instructor.toLowerCase());
      if (byName) return byName;
      return { name: base.instructor, photo: null, specialty: "Senior Instructor", students: 25000, courses: 7, bio: "Passionate educator with real-world experience." };
    }

    return null;
  };

  const resolvedInstructor = resolveInstructor();
  const instructorAvatar = resolvedInstructor?.photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop";

  const courseData = {
    id: base?.id ?? 0,
    title: base?.title ?? "Course Title",
    description: base?.description ?? "Course description goes here.",
    category: base?.category ?? "General",
    level: base?.level ?? "Beginner",
    rating: base?.rating ?? 4.7,
    students: base?.students ?? 1200,
    duration: base?.duration ?? "20h",
    language: base?.language || "English",
    certificate: base?.certificate === true ? "Yes" : base?.certificate || "Yes",
    image: base?.image ?? "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=600&fit=crop",
    instructor: (base && typeof base.instructor === 'object' && base.instructor) ? {
      name: base.instructor.name || "Instructor",
      title: base.instructor.role || "Senior Instructor",
      avatar: base.instructor.image || "https://i.pravatar.cc/150?img=12",
      bio: base.instructor.experience || "Passionate educator with real-world experience.",
      courses: base.instructor.coursesTaught || 7,
      students: base.instructor.students || 25000,
    } : {
      name: (base && base.instructor) || "Instructor",
      title: "Senior Instructor",
      avatar: "https://i.pravatar.cc/150?img=12",
    image: base?.image ?? "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
    instructor: resolvedInstructor ? {
      name: resolvedInstructor.name,
      title: resolvedInstructor.specialty || "Senior Instructor",
      avatar: instructorAvatar,
      bio: resolvedInstructor.bio || "Passionate educator with real-world experience.",
      courses: resolvedInstructor.courses || 7,
      students: resolvedInstructor.students || 25000,
    } : {
      name: "Instructor",
      title: "Senior Instructor",
      avatar: instructorAvatar,
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
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

<<<<<<< HEAD
  // Total lessons from curriculum topics
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const totalLessons = useMemo(
    () => (courseData.curriculum || []).reduce((sum, m) => sum + (m.topics?.length || 0), 0),
    [courseData.curriculum]
  );

<<<<<<< HEAD
  // Check if user is a student
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const isStudent = user?.role === "student";
  const sessionUser = user || getSessionUser();
  const canEnroll = isStudent && sessionUser;

<<<<<<< HEAD
  // Check if user is enrolled
  const enrolledList = useMemo(() => getEnrollmentsNormalized(), []);
  const isEnrolled = useMemo(() => {
    if (!courseData?.id) return false;
    return enrolledList.some(e => 
      e.courseId === courseData.id || 
      e.courseId === String(courseData.id) ||
      Number(e.courseId) === courseData.id
=======
  const enrolledList = useMemo(() => getEnrollmentsNormalized(), []);
  const isEnrolled = useMemo(() => {
    if (!courseData?.id) return false;
    return enrolledList.some(e =>
      e.courseId === courseData.id || e.courseId === String(courseData.id) || Number(e.courseId) === courseData.id
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
    );
  }, [enrolledList, courseData?.id]);

  const [expandedModule, setExpandedModule] = useState(null);

<<<<<<< HEAD
  // Handle enrollment
  const handleEnroll = () => {
    if (!canEnroll || isEnrolled || !courseData?.id) return;
    
    const courseIdToEnroll = courseData.id;
    enrollWithStructure(courseIdToEnroll);
    
    // Show success toast
    setShowToast(true);
    
    // Redirect after a short delay
    setTimeout(() => {
      navigate("/enrollments");
    }, 1500);
  };

  // Close toast after timeout
=======
  const handleEnroll = () => {
    if (!canEnroll || isEnrolled || !courseData?.id) return;
    enrollWithStructure(courseData.id);
    setShowToast(true);
    setTimeout(() => navigate("/enrollments"), 1200);
  };

  // Get the first lesson ID for "Start Learning" button
  const firstLessonId = courseData.curriculum?.[0]?.topics?.[0]?.id || 1;

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {onBack ? (
<<<<<<< HEAD
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
=======
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition">
            <IconArrowLeft /><span className="font-medium">Back to Courses</span>
          </button>
        ) : (
          <Link to="/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition">
            <IconArrowLeft /><span className="font-medium">Back to Courses</span>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
          </Link>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
<<<<<<< HEAD
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full mr-2">
                {courseData.category}
              </span>
              <span className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full">
                {courseData.level}
              </span>
=======
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full mr-2">{courseData.category}</span>
              <span className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-full">{courseData.level}</span>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
              <h1 className="text-4xl font-bold text-gray-900 mt-4">{courseData.title}</h1>
              <p className="text-lg text-gray-600 mt-2">{courseData.description}</p>
            </div>

<<<<<<< HEAD
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
=======
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1"><IconStar className="text-yellow-400" /><span className="font-semibold text-gray-900">{courseData.rating}</span><span>rating</span></div>
              <div className="flex items-center gap-1"><IconUsers /><span className="font-semibold text-gray-900">{courseData.students.toLocaleString?.() ?? courseData.students}</span><span>students</span></div>
              <div className="flex items-center gap-1"><IconClock /><span className="font-semibold text-gray-900">{courseData.duration}</span></div>
              <div className="flex items-center gap-1"><IconBook /><span className="font-semibold text-gray-900">{totalLessons}</span><span>lessons</span></div>
            </div>

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
            {courseData.learningPoints?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                {courseData.learningPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 mb-2">
<<<<<<< HEAD
                    <IconCheckCircle className="text-green-500 mt-0.5" />
                    <span className="text-gray-700">{p}</span>
=======
                    <IconCheckCircle className="text-green-500 mt-0.5" /><span className="text-gray-700">{p}</span>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  </div>
                ))}
              </div>
            )}

<<<<<<< HEAD
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
=======
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
              {courseData.curriculum.map((mod, idx) => {
                const key = mod.id ?? idx;
                const open = key === expandedModule;
                return (
                  <div key={key} className="border border-gray-200 rounded-lg mb-3">
                    <button onClick={() => setExpandedModule(open ? null : key)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left">
                      <div>
                        <h3 className="font-semibold text-gray-900">{`Module ${idx + 1}: ${mod.title}`}</h3>
                        {mod.description && <p className="text-sm text-gray-600">{mod.description}</p>}
                      </div>
                      <IconChevronDown className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
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
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Instructor</h2>
              <div className="flex items-start gap-4">
                <img src={courseData.instructor.avatar} alt={courseData.instructor.name} className="w-20 h-20 rounded-full object-cover" />
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                <div>
                  <h3 className="text-xl font-bold">{courseData.instructor.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{courseData.instructor.title}</p>
                  <p className="text-gray-600 mb-3">{courseData.instructor.bio}</p>
                  <div className="flex gap-8 text-sm">
<<<<<<< HEAD
                    <div>
                      <p className="text-gray-500">Courses</p>
                      <p className="font-semibold text-gray-900">{courseData.instructor.courses}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="font-semibold text-gray-900">{courseData.instructor.students.toLocaleString?.() ?? courseData.instructor.students}</p>
                    </div>
=======
                    <div><p className="text-gray-500">Courses</p><p className="font-semibold text-gray-900">{courseData.instructor.courses}</p></div>
                    <div><p className="text-gray-500">Students</p><p className="font-semibold text-gray-900">{courseData.instructor.students.toLocaleString?.() ?? courseData.instructor.students}</p></div>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  </div>
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* RIGHT — Info only (NO price / NO Add to Cart) */}
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-8 overflow-hidden">
              <img src={courseData.image} alt={courseData.title} className="w-full h-64 object-cover" />
              <div className="p-6 space-y-4">
                <div className="space-y-3 text-sm">
<<<<<<< HEAD
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

                {/* Enrollment button for students */}
                {canEnroll && (
                  <>
                    {isEnrolled ? (
                      <button
                        disabled
                        className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold cursor-not-allowed border border-green-300"
                      >
                        <span>✅</span>
                        Already Enrolled
                      </button>
                    ) : (
                      <button
                        onClick={handleEnroll}
                        className="w-full inline-flex justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                      >
                        Enroll Now
                      </button>
                    )}
                    <Link
                      to="/enrollments"
                      className="w-full inline-flex justify-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition border border-gray-300"
                    >
                      My Learning
                    </Link>
                  </>
                )}
                
                {/* For non-students or logged-out users */}
                {!canEnroll && (
                  <Link
                    to="/courses"
                    className="w-full inline-flex justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
=======
                  <div className="flex justify-between"><span className="text-gray-600">Duration</span><span className="font-semibold text-gray-900">{courseData.duration}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Lessons</span><span className="font-semibold text-gray-900">{totalLessons}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Language</span><span className="font-semibold text-gray-900 flex items-center gap-1"><IconGlobe className="w-4 h-4" /> {courseData.language}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Certificate</span><span className="font-semibold text-gray-900 flex items-center gap-1"><IconCertificate className="w-4 h-4" /> {courseData.certificate}</span></div>
                </div>

                {canEnroll ? (
                  <>
                    {isEnrolled ? (
                      <>
                        <button disabled className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold cursor-not-allowed border border-green-300">
                          <span>✅</span>Already Enrolled
                        </button>
                        {/* START LEARNING BUTTON - NEW */}
                        <Link
                          to={`/courses/${courseData.id}/learn/${firstLessonId}`}
                          className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
                        >
                          <IconPlayCircle />
                          Start Learning
                        </Link>
                      </>
                    ) : (
                      <button onClick={handleEnroll} className="w-full inline-flex justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl">
                        Enroll Now
                      </button>
                    )}
                    <Link to="/enrollments" className="w-full inline-flex justify-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition border border-gray-300">
                      My Learning
                    </Link>
                  </>
                ) : (
                  <Link to="/courses" className="w-full inline-flex justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition">
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    Browse More Courses
                  </Link>
                )}

<<<<<<< HEAD
                {/* Toast notification */}
                {showToast && (
                  <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom">
                    <span>✅</span>
                    <span>Enrolled successfully! Redirecting to My Learning...</span>
=======
                {showToast && (
                  <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-2">
                    <span>✅</span><span>Enrolled successfully! Redirecting to My Learning...</span>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
