// ====== Core mock data ======
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
        id: 'm1',
        title: 'Getting Started',
        lessons: [
          { id: 'l1', title: 'What is React?' },
          { id: 'l2', title: 'Vite + JSX' },
        ],
      },
      {
        id: 'm2',
        title: 'Core Concepts',
        lessons: [
          { id: 'l3', title: 'Props & State' },
          { id: 'l4', title: 'useEffect basics' },
        ],
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
        id: 'm1',
        title: 'Types Everywhere',
        lessons: [
          { id: 'l1', title: 'Primitives & Objects' },
          { id: 'l2', title: 'Functions & Generics' },
        ],
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
        id: 'm1',
        title: 'Intro',
        lessons: [
          { id: 'l1', title: 'Node runtime' },
          { id: 'l2', title: 'Express basics' },
        ],
      },
    ],
  },
]

export const currentUser = {
  id: 'u1',
  name: 'Student One',
  email: 'student1@example.com',
}

// ====== Read helpers ======
export const getCourses = () => courses
export const getCourseById = (id) => courses.find(c => c.id === id) || null

export const searchCourses = (q = '', category = 'All') => {
  const term = q.trim().toLowerCase()
  return courses.filter(c => {
    const inCategory = category === 'All' || c.category === category
    const hit =
      !term ||
      c.title.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.instructor.toLowerCase().includes(term)
    return inCategory && hit
  })
}

// ====== Enrollments stored in localStorage ======
const KEY = 'enrollments'

export function getEnrollments() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function enroll(courseId) {
  const set = new Set(getEnrollments())
  set.add(courseId)
  localStorage.setItem(KEY, JSON.stringify([...set]))
}

export function removeEnrollment(courseId) {
  const rest = getEnrollments().filter(id => id !== courseId)
  localStorage.setItem(KEY, JSON.stringify(rest))
}
