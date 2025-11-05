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
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Getting Started with Python",
        description: "Introduction to Python programming",
        topics: [
          {
            id: 1,
            title: "What is Python?",
            duration: "8m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Learn about Python programming language, its history, and why it's one of the most popular languages today."
          },
          {
            id: 2,
            title: "Installing Python & Setting Up",
            duration: "14m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Step-by-step guide to installing Python on your computer and setting up your development environment."
          }
        ]
      },
      {
        id: 2,
        title: "Python Basics",
        description: "Core Python concepts",
        topics: [
          {
            id: 3,
            title: "Variables and Data Types",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Understanding variables, strings, numbers, and basic data types in Python."
          },
          {
            id: 4,
            title: "Control Flow - If Statements",
            duration: "22m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Learn how to make decisions in your code using if, elif, and else statements."
          }
        ]
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Intro to Machine Learning",
        description: "Foundations and concepts",
        topics: [
          {
            id: 1,
            title: "What is Machine Learning?",
            duration: "10m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Discover what machine learning is, common use cases, and how it differs from traditional programming."
          },
          {
            id: 2,
            title: "Types of Machine Learning",
            duration: "16m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Learn about supervised, unsupervised, and reinforcement learning, with real-world examples."
          }
        ]
      },
      {
        id: 2,
        title: "Supervised Learning Basics",
        description: "Core algorithms and workflow",
        topics: [
          {
            id: 3,
            title: "Regression vs Classification",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Understand the difference between regression and classification problems and when to use each."
          },
          {
            id: 4,
            title: "Train/Test Split & Evaluation",
            duration: "24m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Learn how to split your data, train models, and evaluate performance with common metrics."
          }
        ]
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Foundations of UX",
        description: "Understanding users and problems",
        topics: [
          {
            id: 1,
            title: "What is UX Design?",
            duration: "9m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Explore the fundamentals of UX design and why user-centered design matters."
          },
          {
            id: 2,
            title: "User Research Basics",
            duration: "15m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Learn simple methods for understanding user needs, including interviews and surveys."
          }
        ]
      },
      {
        id: 2,
        title: "UI Design Principles",
        description: "Visual design & layout",
        topics: [
          {
            id: 3,
            title: "Typography & Color",
            duration: "19m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Understand how to choose typography and color palettes that support usability."
          },
          {
            id: 4,
            title: "Layout & Hierarchy",
            duration: "23m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Learn how to structure layouts that guide user attention and create clear hierarchy."
          }
        ]
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Web Foundations",
        description: "HTML & CSS basics",
        topics: [
          {
            id: 1,
            title: "How the Web Works",
            duration: "11m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Understand the client-server model, requests, responses, and how browsers render pages."
          },
          {
            id: 2,
            title: "HTML Structure",
            duration: "17m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Learn semantic HTML tags and how to build accessible page structures."
          }
        ]
      },
      {
        id: 2,
        title: "JavaScript & React",
        description: "Interactivity and SPA basics",
        topics: [
          {
            id: 3,
            title: "JavaScript in the Browser",
            duration: "21m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Explore DOM manipulation and essential JavaScript concepts for the frontend."
          },
          {
            id: 4,
            title: "Intro to React Components",
            duration: "26m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Build your first React components and learn how JSX works."
          }
        ]
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "SQL Foundations",
        description: "Getting started with databases",
        topics: [
          {
            id: 1,
            title: "Relational Databases 101",
            duration: "10m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Understand tables, rows, columns, and how relational databases are structured."
          },
          {
            id: 2,
            title: "SELECT Queries",
            duration: "16m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Learn how to retrieve data using basic SELECT statements and filtering."
          }
        ]
      },
      {
        id: 2,
        title: "Analytics with SQL",
        description: "Aggregations and insights",
        topics: [
          {
            id: 3,
            title: "GROUP BY & Aggregates",
            duration: "19m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Use GROUP BY, COUNT, SUM, AVG, and more to analyze large datasets."
          },
          {
            id: 4,
            title: "JOINs for Analysis",
            duration: "23m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Combine data from multiple tables with INNER JOIN, LEFT JOIN, and RIGHT JOIN."
          }
        ]
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Digital Marketing Overview",
        description: "Channels and strategy",
        topics: [
          {
            id: 1,
            title: "Marketing Funnels",
            duration: "9m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Learn about awareness, consideration, and conversion stages in digital marketing."
          },
          {
            id: 2,
            title: "Key Digital Channels",
            duration: "14m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Review main channels: SEO, PPC, email, and social media marketing."
          }
        ]
      },
      {
        id: 2,
        title: "Content & Social Media",
        description: "Engagement & growth",
        topics: [
          {
            id: 3,
            title: "Content Strategy Basics",
            duration: "17m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Plan and create content that aligns with business goals and user needs."
          },
          {
            id: 4,
            title: "Social Media Campaigns",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Design social media campaigns that grow your audience and drive engagement."
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Advanced React Patterns',
    description: 'Deep dive into advanced React concepts, hooks, performance optimization, and architectural patterns.',
    category: 'Frontend',
    level: 'Advanced',
    instructor: 'Ethan Williams',
    rating: 4.8,
    students: 3200,
    duration: '28h',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Advanced Hooks",
        description: "Custom hooks & patterns",
        topics: [
          {
            id: 1,
            title: "Custom Hooks Design",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Learn how to extract reusable logic into custom hooks and structure them cleanly."
          },
          {
            id: 2,
            title: "useReducer & Complex State",
            duration: "22m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Use useReducer to manage complex component state in a predictable way."
          }
        ]
      },
      {
        id: 2,
        title: "Patterns & Performance",
        description: "Architecture & optimization",
        topics: [
          {
            id: 3,
            title: "Render Optimization",
            duration: "21m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Understand memoization, React.memo, and avoiding unnecessary re-renders."
          },
          {
            id: 4,
            title: "Compound Components Pattern",
            duration: "25m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Implement compound components for flexible, composable UI building blocks."
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Node.js Backend Development',
    description: 'Build scalable server-side applications with Node.js, Express, and MongoDB.',
    category: 'Backend',
    level: 'Intermediate',
    instructor: 'Alex Kim',
    rating: 4.7,
    students: 2750,
    duration: '32h',
    image: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Node Fundamentals",
        description: "Runtime & modules",
        topics: [
          {
            id: 1,
            title: "Node.js Architecture",
            duration: "13m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Explore the event loop, non-blocking I/O, and how Node handles concurrency."
          },
          {
            id: 2,
            title: "Modules & NPM",
            duration: "17m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Learn how to manage dependencies and structure your Node projects with modules."
          }
        ]
      },
      {
        id: 2,
        title: "APIs with Express",
        description: "Routing & persistence",
        topics: [
          {
            id: 3,
            title: "Building REST APIs",
            duration: "22m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Create RESTful endpoints with Express and handle JSON requests and responses."
          },
          {
            id: 4,
            title: "MongoDB Integration",
            duration: "26m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Connect Node.js apps to MongoDB and perform CRUD operations on collections."
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'TypeScript Essentials',
    description: 'Master TypeScript from basics to advanced types, generics, and integration with React.',
    category: 'Language',
    level: 'Intermediate',
    instructor: 'John Smith',
    rating: 4.6,
    students: 2100,
    duration: '22h',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "TypeScript Basics",
        description: "Types & tooling",
        topics: [
          {
            id: 1,
            title: "Why TypeScript?",
            duration: "12m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Learn the benefits of TypeScript and how it improves developer experience in JS projects."
          },
          {
            id: 2,
            title: "Basic Types & Interfaces",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Work with primitive types, interfaces, and type aliases for structured code."
          }
        ]
      },
      {
        id: 2,
        title: "Advanced Typing",
        description: "Generics & utility types",
        topics: [
          {
            id: 3,
            title: "Generics in Practice",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Create reusable functions and components using generics in TypeScript."
          },
          {
            id: 4,
            title: "TS + React Integration",
            duration: "24m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Set up a React project with TypeScript and define props and hooks types."
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Docker & Kubernetes',
    description: 'Learn containerization and orchestration with Docker and Kubernetes for modern deployments.',
    category: 'Backend',
    level: 'Advanced',
    instructor: 'Maria Garcia',
    rating: 4.9,
    students: 1800,
    duration: '26h',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Docker Basics",
        description: "Images & containers",
        topics: [
          {
            id: 1,
            title: "Containerization Concepts",
            duration: "14m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Understand what containers are and how they differ from virtual machines."
          },
          {
            id: 2,
            title: "Building Docker Images",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Write Dockerfiles and build images for your applications."
          }
        ]
      },
      {
        id: 2,
        title: "Kubernetes Essentials",
        description: "Deployments & scaling",
        topics: [
          {
            id: 3,
            title: "K8s Architecture",
            duration: "22m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Learn how Kubernetes clusters are structured: nodes, pods, and services."
          },
          {
            id: 4,
            title: "Deploying to Kubernetes",
            duration: "25m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Create deployments, services, and manage rollouts in Kubernetes."
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: 'JavaScript Fundamentals',
    description: 'Complete guide to JavaScript basics: variables, functions, arrays, objects, and ES6+ features.',
    category: 'Frontend',
    level: 'Beginner',
    instructor: 'Ethan Williams',
    rating: 4.5,
    students: 5600,
    duration: '24h',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "JS Core Concepts",
        description: "Syntax & basics",
        topics: [
          {
            id: 1,
            title: "Variables & Operators",
            duration: "13m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Get familiar with var/let/const and how operators work in JavaScript."
          },
          {
            id: 2,
            title: "Functions & Scope",
            duration: "19m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Learn how functions, parameters, and lexical scope work in JS."
          }
        ]
      },
      {
        id: 2,
        title: "Working with Data",
        description: "Arrays & objects",
        topics: [
          {
            id: 3,
            title: "Arrays & Loops",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Use arrays, for loops, and array methods like map and filter."
          },
          {
            id: 4,
            title: "Objects & ES6 Features",
            duration: "23m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Understand objects, destructuring, template literals, and arrow functions."
          }
        ]
      }
    ]
  },
  {
    id: 12,
    title: 'Deep Learning with TensorFlow',
    description: 'Build neural networks and deep learning models using TensorFlow and Keras.',
    category: 'Data Science',
    level: 'Advanced',
    instructor: 'Dr. Liam Carter',
    rating: 4.8,
    students: 1500,
    duration: '40h',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    curriculum: [
      {
        id: 1,
        title: "Neural Network Foundations",
        description: "Perceptrons & layers",
        topics: [
          {
            id: 1,
            title: "What is a Neural Network?",
            duration: "16m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Understand how neural networks are structured and how they learn from data."
          },
          {
            id: 2,
            title: "Activation Functions",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Explore ReLU, sigmoid, tanh, and when to use each."
          }
        ]
      },
      {
        id: 2,
        title: "TensorFlow & Keras",
        description: "Building models",
        topics: [
          {
            id: 3,
            title: "Building a Model in Keras",
            duration: "24m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Define layers, compile a model, and run your first training loop."
          },
          {
            id: 4,
            title: "Training & Evaluation",
            duration: "27m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Monitor training, validation metrics, and avoid overfitting with regularization."
          }
        ]
      }
    ]
  },
  {
    id: 13,
    title: 'Figma Design Workshop',
    description: 'Master Figma for UI/UX design, prototyping, and collaboration with design systems.',
    category: 'Design',
    level: 'Beginner',
    instructor: 'Sophia Miller',
    rating: 4.7,
    students: 2400,
    duration: '16h',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Figma Basics",
        description: "Interface & tools",
        topics: [
          {
            id: 1,
            title: "Getting Around Figma",
            duration: "10m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Learn the Figma UI, frames, and basic tools used in everyday design."
          },
          {
            id: 2,
            title: "Shapes & Text",
            duration: "14m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Create UI elements using shapes, grids, and typography settings."
          }
        ]
      },
      {
        id: 2,
        title: "Prototyping & Components",
        description: "Design systems",
        topics: [
          {
            id: 3,
            title: "Components & Variants",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Build reusable components and variants for scalable design systems."
          },
          {
            id: 4,
            title: "Interactive Prototypes",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Link screens together to create clickable prototypes and user flows."
          }
        ]
      }
    ]
  },
  {
    id: 14,
    title: 'Content Marketing Mastery',
    description: 'Create engaging content strategies that drive traffic, engagement, and conversions.',
    category: 'Marketing',
    level: 'Intermediate',
    instructor: 'Noah Johnson',
    rating: 4.6,
    students: 1950,
    duration: '20h',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1102',
    curriculum: [
      {
        id: 1,
        title: "Content Strategy",
        description: "Planning & goals",
        topics: [
          {
            id: 1,
            title: "Defining Your Audience",
            duration: "11m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Identify your target audience and understand their pain points."
          },
          {
            id: 2,
            title: "Setting Content Goals",
            duration: "16m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Align content with business objectives and marketing funnel stages."
          }
        ]
      },
      {
        id: 2,
        title: "Content Creation & Distribution",
        description: "Formats & channels",
        topics: [
          {
            id: 3,
            title: "High-Performing Content Types",
            duration: "19m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Explore blogs, videos, podcasts, and social posts that resonate."
          },
          {
            id: 4,
            title: "Content Distribution",
            duration: "22m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Maximize reach using email, social media, and partnerships."
          }
        ]
      }
    ]
  },
  {
    id: 15,
    title: 'Vue.js Complete Guide',
    description: 'Learn Vue.js from scratch to advanced concepts including Vuex, routing, and composition API.',
    category: 'Frontend',
    level: 'Intermediate',
    instructor: 'David Chen',
    rating: 4.7,
    students: 2200,
    duration: '30h',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Vue Fundamentals",
        description: "Reactivity & templates",
        topics: [
          {
            id: 1,
            title: "Vue Instance & Data",
            duration: "14m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Create a basic Vue app and understand reactive data binding."
          },
          {
            id: 2,
            title: "Templates & Directives",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Use v-if, v-for, and other directives to control rendering."
          }
        ]
      },
      {
        id: 2,
        title: "Routing & State",
        description: "Vue Router & Vuex",
        topics: [
          {
            id: 3,
            title: "Vue Router Basics",
            duration: "21m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Set up pages and navigation in a Vue SPA using Vue Router."
          },
          {
            id: 4,
            title: "Global State with Vuex",
            duration: "25m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Manage global state in complex Vue applications with Vuex."
          }
        ]
      }
    ]
  },
  {
    id: 16,
    title: 'GraphQL API Development',
    description: 'Build modern APIs with GraphQL, Apollo Server, and integrate with React applications.',
    category: 'Backend',
    level: 'Intermediate',
    instructor: 'Alex Kim',
    rating: 4.6,
    students: 1600,
    duration: '24h',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "GraphQL Basics",
        description: "Schema & queries",
        topics: [
          {
            id: 1,
            title: "Why GraphQL?",
            duration: "13m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Understand the advantages of GraphQL compared to REST APIs."
          },
          {
            id: 2,
            title: "Schemas & Types",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Define a schema with object types, queries, and mutations."
          }
        ]
      },
      {
        id: 2,
        title: "Apollo & Frontend",
        description: "Server & client",
        topics: [
          {
            id: 3,
            title: "Apollo Server Setup",
            duration: "21m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Create a GraphQL server with Apollo and connect it to a database."
          },
          {
            id: 4,
            title: "Apollo Client + React",
            duration: "24m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Fetch data from your GraphQL server in React components using Apollo Client."
          }
        ]
      }
    ]
  },
  {
    id: 17,
    title: 'C++ Programming Basics',
    description: 'Learn C++ programming fundamentals: syntax, OOP, memory management, and STL.',
    category: 'Language',
    level: 'Beginner',
    instructor: 'Robert Lee',
    rating: 4.4,
    students: 1800,
    duration: '28h',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "C++ Fundamentals",
        description: "Syntax & compilation",
        topics: [
          {
            id: 1,
            title: "Setting Up C++",
            duration: "12m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Install a compiler and configure your environment for C++ development."
          },
          {
            id: 2,
            title: "Basic Syntax & Types",
            duration: "17m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Write your first C++ programs and understand basic data types."
          }
        ]
      },
      {
        id: 2,
        title: "OOP & STL",
        description: "Classes & containers",
        topics: [
          {
            id: 3,
            title: "Classes & Objects",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Learn how to define classes, constructors, and member functions."
          },
          {
            id: 4,
            title: "STL Vectors & Maps",
            duration: "24m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Use common STL containers to manage and store data efficiently."
          }
        ]
      }
    ]
  },
  {
    id: 18,
    title: 'AWS Cloud Computing',
    description: 'Master AWS services: EC2, S3, Lambda, and build scalable cloud applications.',
    category: 'Backend',
    level: 'Advanced',
    instructor: 'Maria Garcia',
    rating: 4.8,
    students: 2100,
    duration: '35h',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "AWS Core Services",
        description: "Compute & storage",
        topics: [
          {
            id: 1,
            title: "Intro to AWS & Console",
            duration: "14m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Get familiar with AWS global infrastructure and the management console."
          },
          {
            id: 2,
            title: "EC2 & S3 Basics",
            duration: "19m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Launch EC2 instances and store data in S3 buckets."
          }
        ]
      },
      {
        id: 2,
        title: "Serverless & Scaling",
        description: "Lambda & autoscaling",
        topics: [
          {
            id: 3,
            title: "AWS Lambda Functions",
            duration: "22m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Write serverless functions and trigger them with events."
          },
          {
            id: 4,
            title: "Autoscaling & Load Balancing",
            duration: "26m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Configure autoscaling groups and load balancers for high availability."
          }
        ]
      }
    ]
  },
  {
    id: 19,
    title: 'Python Data Science',
    description: 'Analyze data with pandas, NumPy, matplotlib, and build data visualization dashboards.',
    category: 'Data Science',
    level: 'Intermediate',
    instructor: 'Olivia Brown',
    rating: 4.7,
    students: 3100,
    duration: '27h',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Data Analysis Stack",
        description: "NumPy & pandas",
        topics: [
          {
            id: 1,
            title: "NumPy Arrays",
            duration: "15m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Learn how to work with numerical data efficiently using NumPy arrays."
          },
          {
            id: 2,
            title: "pandas DataFrames",
            duration: "21m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Use pandas to clean, transform, and explore tabular data."
          }
        ]
      },
      {
        id: 2,
        title: "Visualization & Dashboards",
        description: "matplotlib & more",
        topics: [
          {
            id: 3,
            title: "Plotting with matplotlib",
            duration: "19m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Create basic plots, bar charts, and line graphs for insights."
          },
          {
            id: 4,
            title: "Building Simple Dashboards",
            duration: "24m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Combine visualizations into dashboards for reporting and storytelling."
          }
        ]
      }
    ]
  },
  {
    id: 20,
    title: 'Social Media Marketing',
    description: 'Build your brand on Instagram, Facebook, Twitter, and LinkedIn with proven strategies.',
    category: 'Marketing',
    level: 'Beginner',
    instructor: 'Noah Johnson',
    rating: 4.5,
    students: 2600,
    duration: '15h',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Social Media Foundations",
        description: "Platforms & positioning",
        topics: [
          {
            id: 1,
            title: "Choosing the Right Platforms",
            duration: "11m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Decide which platforms are best suited for your brand and audience."
          },
          {
            id: 2,
            title: "Brand Voice & Style",
            duration: "15m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Define a consistent tone and visual identity for all social content."
          }
        ]
      },
      {
        id: 2,
        title: "Content & Growth",
        description: "Posting & analytics",
        topics: [
          {
            id: 3,
            title: "Creating Engaging Posts",
            duration: "17m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Use visuals, captions, and CTAs that encourage interaction."
          },
          {
            id: 4,
            title: "Analytics & Optimization",
            duration: "20m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Track performance and iterate using insights from analytics dashboards."
          }
        ]
      }
    ]
  },
  {
    id: 21,
    title: 'Mobile App Design',
    description: 'Design beautiful mobile apps for iOS and Android using modern design principles.',
    category: 'Design',
    level: 'Intermediate',
    instructor: 'Sophia Miller',
    rating: 4.6,
    students: 1900,
    duration: '21h',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Mobile UX Principles",
        description: "Small screens, big impact",
        topics: [
          {
            id: 1,
            title: "Mobile Design Patterns",
            duration: "12m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Explore common navigation patterns like tabs, drawers, and bottom bars."
          },
          {
            id: 2,
            title: "Touch Targets & Accessibility",
            duration: "17m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Design finger-friendly interfaces that are inclusive and accessible."
          }
        ]
      },
      {
        id: 2,
        title: "Visual Design for Mobile",
        description: "Components & flows",
        topics: [
          {
            id: 3,
            title: "Designing Core Screens",
            duration: "19m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Create onboarding, home, and detail screens with consistent design."
          },
          {
            id: 4,
            title: "Prototyping User Flows",
            duration: "22m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Link screens into flows that visualize key user journeys."
          }
        ]
      }
    ]
  },
  {
    id: 22,
    title: 'Go Programming Language',
    description: 'Learn Go programming: concurrency, goroutines, channels, and building scalable services.',
    category: 'Language',
    level: 'Advanced',
    instructor: 'James Wilson',
    rating: 4.7,
    students: 1400,
    duration: '29h',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    curriculum: [
      {
        id: 1,
        title: "Go Fundamentals",
        description: "Syntax & tooling",
        topics: [
          {
            id: 1,
            title: "Go Toolchain & Setup",
            duration: "13m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "Install Go, configure GOPATH/Go modules, and run your first Go program."
          },
          {
            id: 2,
            title: "Types & Functions in Go",
            duration: "18m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "Work with built-in types, structs, and functions in Go."
          }
        ]
      },
      {
        id: 2,
        title: "Concurrency in Go",
        description: "Goroutines & channels",
        topics: [
          {
            id: 3,
            title: "Goroutines Explained",
            duration: "21m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Understand lightweight threads in Go and when to use them."
          },
          {
            id: 4,
            title: "Channels & Synchronization",
            duration: "25m",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "Coordinate concurrent tasks using channels and avoid race conditions."
          }
        ]
      }
    ]
  }
];


export const courses = [
  {
    id: 'react-101',
    title: 'React 101',
    level: 'Beginner',
    category: 'Frontend',
    description: 'Learn React fundamentals: components, props, state, and effects.',
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
          { id: 'l4', title: 'useEffect Basics' },
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
          { id: 'l1', title: 'Node Runtime' },
          { id: 'l2', title: 'Express Basics' },
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
// Get course by ID from either mockCourses or courses array
export const getCourseById = (id) => {
  // First check mockCourses (numeric IDs)
  const fromMock = mockCourses.find(c => c.id === id || c.id === Number(id));
  if (fromMock) return fromMock;
  // Then check legacy courses (string IDs)
  return courses.find(c => c.id === id) || null;
};

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

// ====== Mock instructors data ======
export const instructors = [
  {
    id: 1,
    name: "Emma Thompson",
    specialty: "Python & Programming",
    yearsOfExperience: 8,
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces",
    bio:
      "Experienced software engineer and educator passionate about making programming accessible.",
    courses: 12,
    students: 15000,
  },
  {
    id: 2,
    name: "Dr. Liam Carter",
    specialty: "Machine Learning & AI",
    yearsOfExperience: 12,
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces",
    bio:
      "PhD in Computer Science with extensive research in machine learning and data science.",
    courses: 8,
    students: 8500,
  },
  {
    id: 3,
    name: "Sophia Miller",
    specialty: "UI/UX Design",
    yearsOfExperience: 10,
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=faces",
    bio:
      "Award-winning designer with expertise in creating intuitive and beautiful user experiences.",
    courses: 15,
    students: 12000,
  },
  {
    id: 4,
    name: "Ethan Williams",
    specialty: "Web Development",
    yearsOfExperience: 9,
    photo:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop&crop=faces",
    bio:
      "Full-stack developer and educator specializing in modern web technologies.",
    courses: 18,
    students: 20000,
  },
];




// ====== Mock testimonials data ======
export const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Software Developer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote: 'The courses here completely transformed my career. The hands-on projects and expert guidance helped me land my dream job in tech.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=33',
    quote: 'I love the flexible learning pace and interactive curriculum. Perfect for working professionals who want to upskill.',
    rating: 5
  },
  {
    id: 3,
    name: 'Jessica Park',
    role: 'Data Analyst',
    avatar: 'https://i.pravatar.cc/150?img=45',
    quote: 'The track progress feature keeps me motivated, and the quality of instruction is outstanding. Highly recommend!',
    rating: 5
  },
  {
    id: 4,
    name: 'Ryan Mitchell',
    role: 'Full-Stack Developer',
    avatar: 'https://i.pravatar.cc/150?img=51',
    quote: 'Best platform for learning modern web technologies. The instructors explain complex topics in simple terms.',
    rating: 5
  },
  {
    id: 5,
    name: 'Emily Watson',
    role: 'Product Designer',
    avatar: 'https://i.pravatar.cc/150?img=47',
    quote: 'The design courses are top-notch. I learned industry-standard tools and techniques that I use daily at work.',
    rating: 5
  }
];

// ====== How It Works Steps ======
export const howItWorksSteps = [
  {
    icon: 'Search',
    title: 'Browse Courses',
    text: 'Choose from hundreds of free tutorials.'
  },
  {
    icon: 'BookOpen',
    title: 'Enroll Instantly',
    text: 'Join with a single click and start learning.'
  },
  {
    icon: 'BarChart',
    title: 'Track Progress',
    text: 'Monitor your achievements as you go.'
  }
];

// ====== Why Choose Us Data ======
export const whyChooseUsData = [
  {
    icon: 'Graduation',
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of real-world experience and proven teaching methods.'
  },
  {
    icon: 'Zap',
    title: 'Learn at Your Own Pace',
    description: 'Study whenever and wherever you want. No deadlines or pressure, just pure learning at your speed.'
  },
  {
    icon: 'Puzzle',
    title: 'Real-World Projects',
    description: 'Build practical projects that you can add to your portfolio and showcase to potential employers.'
  },
  {
    icon: 'Trophy',
    title: 'Certificate of Completion',
    description: 'Earn certificates upon course completion to validate your skills and boost your resume.'
  }
];

// ====== Platform Stats ======
export const platformStats = [
  {
    icon: 'Users',
    label: 'Active Learners',
    value: '15,000+'
  },
  {
    icon: 'Book',
    label: 'Free Courses',
    value: '200+'
  },
  {
    icon: 'Graduation',
    label: 'Instructors',
    value: '50+'
  },
  {
    icon: 'Star',
    label: 'Satisfaction Rate',
    value: '98%'
  }
];

// ====== Course Categories ======
export const categories = [
  {
    id: 1,
    name: 'Frontend Development',
    icon: 'Laptop',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 2,
    name: 'Backend Development',
    icon: 'Server',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    name: 'Data Science',
    icon: 'BarChart',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    name: 'Languages',
    icon: 'Code',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    name: 'Design',
    icon: 'Palette',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 6,
    name: 'Marketing',
    icon: 'TrendingUp',
    color: 'from-yellow-500 to-amber-500'
  }
];

// ====== Learning Paths ======
export const learningPaths = [
  {
    level: 'Beginner',
    description: 'Start from the basics and build a strong foundation.',
    courses: [1, 3, 4, 11]
  },
  {
    level: 'Intermediate',
    description: 'Take your skills further with advanced concepts and real projects.',
    courses: [2, 5, 8, 9, 15]
  },
  {
    level: 'Advanced',
    description: 'Master advanced topics and become an expert in your field.',
    courses: [7, 10, 12, 18, 22]
  }
];

// ====== Newsletter Content ======
export const newsletterContent = {
  title: 'Join Our Learning Community',
  text: 'Stay updated on new courses, instructors, and learning tips.'
};