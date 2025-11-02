// ====== Core mock data (courses stay the same) ======
// Shared mock course data accessible everywhere
// Shared mock course data accessible throughout the app
export const mockCourses = [
  {
    id: 1,
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python. Learn syntax, data structures, and build practical projects.',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Emma Thompson',
    rating: 4.6,
    students: 3421,
    duration: '20h',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning concepts, algorithms, and practical applications using Python.',
    category: 'Data Science',
    level: 'Intermediate',
    instructor: 'Dr. Liam Carter',
    rating: 4.7,
    students: 2103,
    duration: '35h',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    description: 'Learn user interface and user experience design principles. Create stunning, user-friendly designs.',
    category: 'Design',
    level: 'Beginner',
    instructor: 'Sophia Miller',
    rating: 4.8,
    students: 1567,
    duration: '30h',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Web Development Bootcamp',
    description: 'Complete guide to modern web development with HTML, CSS, JavaScript, and React.',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Ethan Williams',
    rating: 4.9,
    students: 4832,
    duration: '45h',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Data Analytics with SQL',
    description: 'Master SQL for data analysis, from basic queries to advanced database management.',
    category: 'Data Science',
    level: 'Intermediate',
    instructor: 'Olivia Brown',
    rating: 4.5,
    students: 2890,
    duration: '25h',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Digital Marketing Strategy',
    description: 'Learn modern digital marketing techniques, SEO, social media, and content marketing.',
    category: 'Marketing',
    level: 'Beginner',
    instructor: 'Noah Johnson',
    rating: 4.4,
    students: 1923,
    duration: '18h',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
  }
];




export const courses = [
  {
    id: 'react-101',
    title: 'React 101',
    level: 'Beginner',
    category: 'Frontend',
    description: 'Learn React fundamentals: components, props, state, effects.',
    instructor: 'Jane Doe',
    modules: [
      {
        id: 'm1', title: 'Getting Started', lessons: [
          { id: 'l1', title: 'What is React?' },
          { id: 'l2', title: 'Vite + JSX' },
        ]
      },
      {
        id: 'm2', title: 'Core Concepts', lessons: [
          { id: 'l3', title: 'Props & State' },
          { id: 'l4', title: 'useEffect basics' },
        ]
      },
    ],
  },
  {
    id: 'ts-essentials',
    title: 'TypeScript Essentials',
    level: 'Intermediate',
    category: 'Language',
    description: 'Practical TS types, interfaces, generics, React with TS.',
    instructor: 'John Smith',
    modules: [
      {
        id: 'm1', title: 'Types Everywhere', lessons: [
          { id: 'l1', title: 'Primitives & Objects' },
          { id: 'l2', title: 'Functions & Generics' },
        ]
      },
    ],
  },
  {
    id: 'node-fundamentals',
    title: 'Node Fundamentals',
    level: 'Beginner',
    category: 'Backend',
    description: 'Build simple APIs with Node.js and Express.',
    instructor: 'Alex Kim',
    modules: [
      {
        id: 'm1', title: 'Intro', lessons: [
          { id: 'l1', title: 'Node runtime' },
          { id: 'l2', title: 'Express basics' },
        ]
      },
    ],
  },
];

// ====== Demo users + roles (Phase 1 mock auth) ======
export const users = [
  { id: 'u1', name: 'Student One', email: 'student1@example.com', password: '123456', role: 'student' },
  { id: 'u2', name: 'Instructor One', email: 'instructor1@example.com', password: '123456', role: 'instructor' },
];

// Kept for backward compatibility (used by some views when no session)
export const currentUser = { id: 'u1', name: 'Student One', email: 'student1@example.com' };

// ====== Read helpers ======
export const getCourses = () => courses;
export const getCourseById = (id) => courses.find(c => c.id === id) || null;

export const searchCourses = (q = '', category = 'All') => {
  const term = q.trim().toLowerCase();
  return courses.filter(c => {
    const inCategory = category === 'All' || c.category === category;
    const hit =
      !term ||
      c.title.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.instructor.toLowerCase().includes(term);
    return inCategory && hit;
  });
};

// ====== LocalStorage helpers (safe in browser) ======
const hasLS = () => typeof window !== 'undefined' && !!window.localStorage;

// ====== Enrollments stored in localStorage ======
const ENROLL_KEY = 'ctms_enrollments';

export function getEnrollments() {
  if (!hasLS()) return [];
  try { return JSON.parse(localStorage.getItem(ENROLL_KEY) || '[]'); }
  catch { return []; }
}

export function enroll(courseId) {
  if (!hasLS()) return;
  const set = new Set(getEnrollments());
  set.add(courseId);
  localStorage.setItem(ENROLL_KEY, JSON.stringify([...set]));
}

export function removeEnrollment(courseId) {
  if (!hasLS()) return;
  const rest = getEnrollments().filter(id => id !== courseId);
  localStorage.setItem(ENROLL_KEY, JSON.stringify(rest));
}

// Utility: count all lessons of a course
export const totalLessonsOf = (course) =>
  course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

// Normalize enrollments (supports legacy array-of-ids)
export function getEnrollmentsNormalized() {
  const raw = getEnrollments();
  return raw.map((e, i) =>
    typeof e === "string"
      ? { id: `e${i}`, courseId: e, progress: 0, completedLessons: [] }
      : { id: e.id || `e${i}`, courseId: e.courseId, progress: e.progress ?? 0, completedLessons: e.completedLessons ?? [] }
  );
}

// If you want to create new enrollments with structure:
export function enrollWithStructure(courseId) {
  const list = getEnrollmentsNormalized();
  if (list.some((e) => e.courseId === courseId)) return;
  list.push({ id: `e${Date.now()}`, courseId, progress: 0, completedLessons: [] });
  localStorage.setItem(ENROLL_KEY, JSON.stringify(list));
}


// (optional) clear enrollments for testing
export function clearEnrollments() {
  if (!hasLS()) return;
  localStorage.removeItem(ENROLL_KEY);
}

// ====== Mock auth stored in localStorage ======
const AUTH_KEY = 'ctms_user';

export function mockLogin(email, password) {
  const u = users.find(x => x.email === email && x.password === password) || null;
  if (!u || !hasLS()) return null;
  localStorage.setItem(AUTH_KEY, JSON.stringify(u));
  return u; // {id,name,email,role}
}

export function mockLogout() {
  if (!hasLS()) return;
  localStorage.removeItem(AUTH_KEY);
}

export function getSessionUser() {
  if (!hasLS()) return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null; // {id,name,email,role} | null
  } catch { return null; }
}

// Convenience role helpers
export const isStudent = (u) => u?.role === 'student';
export const isInstructor = (u) => u?.role === 'instructor';

// ====== Completed courses (simple) ======
const COMPLETE_KEY = 'ctms_completed';

export function getCompletedCourseIds() {
  try {
    return JSON.parse(localStorage.getItem(COMPLETE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isCourseCompleted(courseId) {
  return getCompletedCourseIds().includes(courseId);
}

export function markCourseCompleted(courseId) {
  const set = new Set(getCompletedCourseIds());
  set.add(courseId);
  localStorage.setItem(COMPLETE_KEY, JSON.stringify([...set]));
}

export function unmarkCourseCompleted(courseId) {
  const rest = getCompletedCourseIds().filter(id => id !== courseId);
  localStorage.setItem(COMPLETE_KEY, JSON.stringify(rest));
}
