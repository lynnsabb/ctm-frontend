import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { mockCourses as courses } from "../data/mock";

// === Inline SVG icons ===
function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}
function IconFilter(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm3 6h4v2h-4v-2z" />
    </svg>
  );
}
function IconChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}
function IconStar(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden {...props}>
      <path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden {...props}>
      <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0C9.66 11 11 9.66 11 8S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C18 14.17 13.33 13 11 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5C26 14.17 21.33 13 19 13z" />
    </svg>
  );
}
function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden {...props}>
      <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
    </svg>
  );
}

export default function CourseCatalog() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(courses.map(c => c.category)))], []);
  const levels = useMemo(() => ['All', ...Array.from(new Set(courses.map(c => c.level)))], []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Most Popular');

  const filteredCourses = useMemo(() => {
    let list = [...courses];
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(c => {
        const instructorName = typeof c.instructor === 'string' 
          ? c.instructor 
          : c.instructor?.name || '';
        return [c.title, c.description, c.category, instructorName].join(' ').toLowerCase().includes(query);
      });
    }
    if (selectedCategory !== 'All') list = list.filter(c => c.category === selectedCategory);
    if (selectedLevel !== 'All') list = list.filter(c => c.level === selectedLevel);
    if (selectedSort === 'Highest Rated') list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.students - a.students);
    return list;
  }, [searchQuery, selectedCategory, selectedLevel, selectedSort]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-blue-500';
      case 'Advanced': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">All Courses</h1>
          <p className="text-gray-600 text-lg">
            Explore our collection of {courses.length} courses and start learning today
          </p>
        </div>

        {/* === Filters Section (unchanged) === */}
        {/* Keep the same filters here as in your working version */}

        {/* === Course Grid === */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Link key={course.id} to={`/courses/${course.id}`} className="block">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">

                  {/* Image + Level Badge */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <span className={`absolute top-4 right-4 px-3 py-1 ${getLevelColor(course.level)} text-white text-sm font-medium rounded-full`}>
                      {course.level}
                    </span>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-3">
                      {course.category}
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <p className="text-sm text-gray-500 mb-4">
                      Instructor: <span className="font-medium text-gray-800">
                        {typeof course.instructor === 'string' 
                          ? course.instructor 
                          : course.instructor?.name || 'Unknown'}
                      </span>
                    </p>

                    {/* Icons: Rating / Students / Duration */}
                    <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-3">
                      <div className="flex items-center gap-1">
                        <IconStar className="text-yellow-400" />
                        <span className="font-semibold text-gray-900">{course.rating}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <IconUsers />
                        <span>{course.students.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <IconClock />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No courses found matching your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
