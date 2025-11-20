import { useState, useMemo } from "react";
import { mockCourses as initialCourses } from "../data/mock";

// Icon components
function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconEdit(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function IconStar(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

<<<<<<< HEAD
=======
// ---------- helpers: map between curriculum <-> modules ----------

// our internal lesson shape
const createEmptyLesson = () => ({
  id: Date.now() + Math.random(),
  title: "",
  videoUrl: "",
  duration: "",
  description: "",
});

// our internal module shape
const createEmptyModule = () => ({
  id: Date.now() + Math.random(),
  title: "",
  description: "",
  lessons: [createEmptyLesson()],
});

// curriculum (sections) -> modules (for the form)
const mapCurriculumToModules = (curriculum = []) =>
  curriculum.map((section) => ({
    id: section.id ?? Date.now() + Math.random(),
    title: section.title || "",
    description: section.description || "",
    lessons: (section.topics || []).map((topic) => ({
      id: topic.id ?? Date.now() + Math.random(),
      title: topic.title || "",
      duration: topic.duration || "",
      videoUrl: topic.videoUrl || "",
      // description in the form is content from mock
      description: topic.content || "",
    })),
  }));

// modules (from form) -> curriculum (for the course object)
const mapModulesToCurriculum = (modules = []) =>
  modules.map((module, mIndex) => ({
    id: module.id ?? mIndex + 1,
    title: module.title,
    description: module.description,
    topics: (module.lessons || []).map((lesson, lIndex) => ({
      id: lesson.id ?? lIndex + 1,
      title: lesson.title,
      duration: lesson.duration,
      videoUrl: lesson.videoUrl,
      content: lesson.description, // back to mock's "content"
    })),
  }));

// ---------- component ----------

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
export default function ManageCourse() {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [toast, setToast] = useState(null);

<<<<<<< HEAD
  // Form state
=======
  // form state (uses "modules", not "curriculum")
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const [formData, setFormData] = useState({
    title: "",
    category: "Programming",
    level: "Beginner",
    description: "",
    instructor: "",
    duration: "",
    image: "",
    rating: 4.5,
    students: 0,
<<<<<<< HEAD
  });

  // Get unique categories from courses
=======
    modules: [],
  });

  // unique categories
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(courses.map((c) => c.category))];
    return cats;
  }, [courses]);

<<<<<<< HEAD
  // Filter courses by category and search
  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    // Filter by category
=======
  // search + filter
  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
    if (selectedCategory !== "All") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

<<<<<<< HEAD
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.instructor.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
=======
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
      );
    }

    return filtered;
  }, [courses, selectedCategory, searchQuery]);

<<<<<<< HEAD
  // Show toast notification
=======
  // toast
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

<<<<<<< HEAD
  // Reset form
=======
  // reset form
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const resetForm = () => {
    setFormData({
      title: "",
      category: "Programming",
      level: "Beginner",
      description: "",
      instructor: "",
      duration: "",
      image: "",
      rating: 4.5,
      students: 0,
<<<<<<< HEAD
=======
      modules: [],
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
    });
    setEditingCourse(null);
  };

<<<<<<< HEAD
  // Open modal for adding new course
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const handleAddCourse = () => {
    resetForm();
    setIsModalOpen(true);
  };

<<<<<<< HEAD
  // Open modal for editing course
  const handleEditCourse = (course) => {
=======
  // THIS is the important "link": map curriculum -> modules
  const handleEditCourse = (course) => {
    const modulesFromCurriculum = mapCurriculumToModules(course.curriculum);

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
    setFormData({
      title: course.title || "",
      category: course.category || "Programming",
      level: course.level || "Beginner",
      description: course.description || "",
<<<<<<< HEAD
      instructor: typeof course.instructor === 'string' 
        ? course.instructor 
        : course.instructor?.name || "",
=======
      instructor:
        typeof course.instructor === "string"
          ? course.instructor
          : course.instructor?.name || "",
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
      duration: course.duration || "",
      image: course.image || "",
      rating: course.rating || 4.5,
      students: course.students || 0,
<<<<<<< HEAD
    });
=======
      modules: modulesFromCurriculum,
    });

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
    setEditingCourse(course);
    setIsModalOpen(true);
  };

<<<<<<< HEAD
  // Close modal
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

<<<<<<< HEAD
  // Handle form input change
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
<<<<<<< HEAD
      [name]: name === "rating" || name === "students" ? parseFloat(value) || 0 : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCourse) {
      // Update existing course
=======
      [name]:
        name === "rating" || name === "students"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // ------- modules & lessons handlers -------

  const handleAddModuleClick = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, createEmptyModule()],
    }));
  };

  const handleRemoveModule = (moduleIndex) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== moduleIndex),
    }));
  };

  const handleModuleFieldChange = (moduleIndex, field, value) => {
    setFormData((prev) => {
      const modules = [...prev.modules];
      modules[moduleIndex] = { ...modules[moduleIndex], [field]: value };
      return { ...prev, modules };
    });
  };

  const handleAddLesson = (moduleIndex) => {
    setFormData((prev) => {
      const modules = [...prev.modules];
      const mod = modules[moduleIndex];
      modules[moduleIndex] = {
        ...mod,
        lessons: [...mod.lessons, createEmptyLesson()],
      };
      return { ...prev, modules };
    });
  };

  const handleRemoveLesson = (moduleIndex, lessonIndex) => {
    setFormData((prev) => {
      const modules = [...prev.modules];
      const mod = modules[moduleIndex];
      modules[moduleIndex] = {
        ...mod,
        lessons: mod.lessons.filter((_, i) => i !== lessonIndex),
      };
      return { ...prev, modules };
    });
  };

  const handleLessonFieldChange = (
    moduleIndex,
    lessonIndex,
    field,
    value
  ) => {
    setFormData((prev) => {
      const modules = [...prev.modules];
      const mod = modules[moduleIndex];
      const lessons = [...mod.lessons];
      lessons[lessonIndex] = { ...lessons[lessonIndex], [field]: value };
      modules[moduleIndex] = { ...mod, lessons };
      return { ...prev, modules };
    });
  };

  // submit: map modules -> curriculum before saving
  const handleSubmit = (e) => {
    e.preventDefault();

    const curriculum = mapModulesToCurriculum(formData.modules);

    if (editingCourse) {
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? {
<<<<<<< HEAD
                ...c,
                ...formData,
              }
=======
              ...c,
              ...formData,
              curriculum, // keep rest of app happy
            }
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
            : c
        )
      );
      showToast("✅ Course updated successfully", "success");
    } else {
<<<<<<< HEAD
      // Add new course
      const newCourse = {
        id: Date.now(),
        ...formData,
=======
      const newCourse = {
        id: Date.now(),
        ...formData,
        curriculum,
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
      };
      setCourses((prev) => [newCourse, ...prev]);
      showToast("✅ Course added successfully", "success");
    }

    handleCloseModal();
  };

<<<<<<< HEAD
  // Handle delete click
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

<<<<<<< HEAD
  // Confirm delete
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const handleConfirmDelete = () => {
    if (courseToDelete) {
      setCourses((prev) => prev.filter((c) => c.id !== courseToDelete.id));
      showToast("✅ Course deleted successfully", "success");
    }
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

<<<<<<< HEAD
  // Cancel delete
=======
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCourseToDelete(null);
  };

<<<<<<< HEAD
=======
  // ---------- JSX ----------

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
<<<<<<< HEAD
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Manage Courses</h1>
              <p className="text-gray-600 text-lg">Add, edit, and organize your courses easily.</p>
=======
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Manage Courses
              </h1>
              <p className="text-gray-600 text-lg">
                Add, edit, and organize your courses easily.
              </p>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
            </div>
            <button
              onClick={handleAddCourse}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <IconPlus />
              Add New Course
            </button>
          </div>

<<<<<<< HEAD
          {/* Search Bar */}
=======
          {/* Search */}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
          <div className="mb-6">
            <div className="relative max-w-md">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by title, instructor, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              />
            </div>
          </div>

<<<<<<< HEAD
          {/* Category Filter */}
=======
          {/* Category filter */}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
<<<<<<< HEAD
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
=======
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
              >
                {category}
              </button>
            ))}
          </div>
        </header>

<<<<<<< HEAD
        {/* Courses Grid */}
=======
        {/* Courses grid */}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
<<<<<<< HEAD
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                  <img
                    src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"}
=======
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                  <img
                    src={
                      course.image ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
                    }
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    Free Course
                  </span>
                </div>

<<<<<<< HEAD
                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
=======
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                          {course.category}
                        </span>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </div>

<<<<<<< HEAD
                    <p className="text-sm text-gray-500 mb-2">
                      Instructor: <span className="font-medium text-gray-800">
                        {typeof course.instructor === 'string' 
                          ? course.instructor 
                          : course.instructor?.name || 'Unknown'}
                      </span>
                    </p>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-4 mb-4">
                    <div className="flex items-center gap-1">
                      <IconStar className="text-yellow-400" />
                      <span className="font-semibold text-gray-900">{course.rating}</span>
                    </div>
                    <span className="text-gray-600">{course.duration}</span>
                    <span className="text-gray-600">{course.students?.toLocaleString() || 0} students</span>
                  </div>

                  {/* Action Buttons */}
=======
                  <p className="text-sm text-gray-500 mb-2">
                    Instructor:{" "}
                    <span className="font-medium text-gray-800">
                      {typeof course.instructor === "string"
                        ? course.instructor
                        : course.instructor?.name || "Unknown"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-4 mb-4">
                    <div className="flex items-center gap-1">
                      <IconStar className="text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-gray-600">{course.duration}</span>
                    <span className="text-gray-600">
                      {course.students?.toLocaleString() || 0} students
                    </span>
                  </div>

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <IconEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <IconTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg mb-2">No courses found</p>
            <p className="text-gray-400 text-sm">
              {selectedCategory !== "All" || searchQuery.trim()
                ? "Try adjusting your filters or search query."
                : "Start by adding your first course!"}
            </p>
          </div>
        )}

<<<<<<< HEAD
        {/* Add/Edit Course Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4" onClick={handleCloseModal}>
=======
        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
            onClick={handleCloseModal}
          >
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
            <div
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <IconX />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< HEAD
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
=======
                {/* basic fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title *
                  </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Advanced React Patterns"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

<<<<<<< HEAD
                {/* Category and Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
=======
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Programming">Programming</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Language">Language</option>
                    </select>
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
=======
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level *
                    </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

<<<<<<< HEAD
                {/* Instructor and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
=======
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructor *
                    </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Jane Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
=======
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 20h"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

<<<<<<< HEAD
                {/* Rating and Students */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
=======
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="4.5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
<<<<<<< HEAD
                    <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
=======
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Students
                    </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    <input
                      type="number"
                      name="students"
                      value={formData.students}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

<<<<<<< HEAD
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
=======
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

<<<<<<< HEAD
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
=======
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
<<<<<<< HEAD
                    rows={4}
=======
                    rows={3}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                    placeholder="Describe what students will learn in this course..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

<<<<<<< HEAD
                {/* Submit Buttons */}
=======
                {/* Modules & Lessons */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Modules & Lessons
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddModuleClick}
                      className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <IconPlus />
                      Add Module
                    </button>
                  </div>

                  {formData.modules.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No modules yet. Click &quot;Add Module&quot; to get started.
                    </p>
                  )}

                  <div className="space-y-4">
                    {formData.modules.map((module, mIndex) => (
                      <div
                        key={module.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-semibold text-gray-800">
                            Module {mIndex + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(mIndex)}
                            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                          >
                            <IconTrash />
                            Remove Module
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Module Title *
                            </label>
                            <input
                              type="text"
                              value={module.title}
                              onChange={(e) =>
                                handleModuleFieldChange(
                                  mIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="e.g., Getting Started"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Module Description
                            </label>
                            <input
                              type="text"
                              value={module.description}
                              onChange={(e) =>
                                handleModuleFieldChange(
                                  mIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Optional short description"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        <div className="mt-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-800">
                              Lessons
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddLesson(mIndex)}
                              className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                            >
                              <IconPlus />
                              Add Lesson
                            </button>
                          </div>

                          {module.lessons.map((lesson, lIndex) => (
                            <div
                              key={lesson.id}
                              className="border border-dashed border-gray-300 rounded-md p-3 space-y-2 bg-gray-50"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-700">
                                  Lesson {lIndex + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveLesson(mIndex, lIndex)
                                  }
                                  className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                                >
                                  <IconTrash />
                                  Remove
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Lesson Title *
                                  </label>
                                  <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) =>
                                      handleLessonFieldChange(
                                        mIndex,
                                        lIndex,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                    required
                                    placeholder="e.g., What is Python?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Video URL *
                                  </label>
                                  <input
                                    type="url"
                                    value={lesson.videoUrl}
                                    onChange={(e) =>
                                      handleLessonFieldChange(
                                        mIndex,
                                        lIndex,
                                        "videoUrl",
                                        e.target.value
                                      )
                                    }
                                    required
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Duration
                                  </label>
                                  <input
                                    type="text"
                                    value={lesson.duration}
                                    onChange={(e) =>
                                      handleLessonFieldChange(
                                        mIndex,
                                        lIndex,
                                        "duration",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g., 12m"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Lesson Description
                                  </label>
                                  <input
                                    type="text"
                                    value={lesson.description}
                                    onChange={(e) =>
                                      handleLessonFieldChange(
                                        mIndex,
                                        lIndex,
                                        "description",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Brief description of this lesson"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {editingCourse ? "Update Course" : "Add Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

<<<<<<< HEAD
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && courseToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4" onClick={handleCancelDelete}>
=======
        {/* Delete Modal */}
        {isDeleteModalOpen && courseToDelete && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
            onClick={handleCancelDelete}
          >
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
            <div
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
<<<<<<< HEAD
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Course</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>"{courseToDelete.title}"</strong>? This action cannot be undone.
=======
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Delete Course
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>"{courseToDelete.title}"</strong>? This action cannot
                be undone.
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-6 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

<<<<<<< HEAD
        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed bottom-4 right-4 flex items-center gap-2 px-6 py-4 bg-white border-2 rounded-xl shadow-lg z-50 ${
              toast.type === "success" ? "border-green-500" : "border-red-500"
            }`}
=======
        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-4 right-4 flex items-center gap-2 px-6 py-4 bg-white border-2 rounded-xl shadow-lg z-50 ${toast.type === "success" ? "border-green-500" : "border-red-500"
              }`}
>>>>>>> 8664c9903c9e5eb83bdfd6c1cad3899b3d2927fc
          >
            <IconCheck className="text-green-500" />
            <span className="text-gray-900 font-medium">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
