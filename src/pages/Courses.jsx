import { useState, useMemo } from 'react';
import { Link } from "react-router-dom";

// Inline SVG Icons
function IconSearch(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
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

function IconFilter(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm3 6h4v2h-4v-2z" />
    </svg>
  );
}

function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden {...props}>
      <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden {...props}>
      <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  );
}

function IconChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
}

export default function CourseCatalog() {
  const courses = [
    {
      id: 1,
      title: 'Python for Beginners',
      description: 'Start your programming journey with Python. Learn syntax, data structures, and build practical projects.',
      category: 'Programming',
      level: 'Beginner',
      rating: 4.6,
      students: 3421,
      duration: '20h',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to machine learning concepts, algorithms, and practical applications using Python.',
      category: 'Data Science',
      level: 'Intermediate',
      rating: 4.7,
      students: 2103,
      duration: '35h',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      description: 'Learn user interface and user experience design principles. Create stunning, user-friendly designs.',
      category: 'Design',
      level: 'Beginner',
      rating: 4.8,
      students: 1567,
      duration: '30h',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Web Development Bootcamp',
      description: 'Complete guide to modern web development with HTML, CSS, JavaScript, and React.',
      category: 'Programming',
      level: 'Beginner',
      rating: 4.9,
      students: 4832,
      duration: '45h',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Data Analytics with SQL',
      description: 'Master SQL for data analysis, from basic queries to advanced database management.',
      category: 'Data Science',
      level: 'Intermediate',
      rating: 4.5,
      students: 2890,
      duration: '25h',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Digital Marketing Strategy',
      description: 'Learn modern digital marketing techniques, SEO, social media, and content marketing.',
      category: 'Marketing',
      level: 'Beginner',
      rating: 4.4,
      students: 1923,
      duration: '18h',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
    }
  ];

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
      list = list.filter(c =>
        [c.title, c.description, c.category].join(' ').toLowerCase().includes(query)
      );
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
          <p className="text-gray-600 text-lg">Explore our collection of {courses.length} courses and start learning today</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <IconFilter className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <IconSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <IconChevronDown className="text-gray-400" />
              </div>
            </div>

            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <IconChevronDown className="text-gray-400" />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option>Most Popular</option>
                <option>Highest Rated</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <IconChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Link key={course.id} to={`/courses/${course.id}`} className="block">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-4 right-4 px-3 py-1 ${getLevelColor(course.level)} text-white text-sm font-medium rounded-full`}>
                      {course.level}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-3">
                      {course.category}
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600">
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

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">
                        ${course.price}
                      </span>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
                        Enroll Now
                      </button>
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
