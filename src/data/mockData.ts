
import { Course, Quiz, Achievement, LeaderboardEntry, UserStats } from "./models";

export const courses: Course[] = [
  {
    id: "c1",
    title: "Fundamentals of Circuit Theory",
    description: "Learn the core concepts of electrical circuit analysis and design. This course covers Ohm's Law, Kirchhoff's Laws, and circuit theorems.",
    category: "Electrical Engineering",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
    modules: [
      {
        id: "m1-c1",
        title: "Basic Circuit Components",
        description: "Understanding resistors, capacitors, and inductors",
        lessons: [
          {
            id: "l1-m1-c1",
            title: "Introduction to Circuit Elements",
            content: "Learn about the basic building blocks of electrical circuits...",
            completed: false,
            pointsReward: 10
          },
          {
            id: "l2-m1-c1",
            title: "Resistors and Ohm's Law",
            content: "Understand how resistors work and how to apply Ohm's Law...",
            completed: false,
            pointsReward: 15
          }
        ],
        quizId: "q1",
        unlocked: true
      },
      {
        id: "m2-c1",
        title: "Kirchhoff's Laws",
        description: "Apply Kirchhoff's Current and Voltage Laws to analyze circuits",
        lessons: [
          {
            id: "l1-m2-c1",
            title: "Kirchhoff's Current Law (KCL)",
            content: "Learn how current behaves at junctions in circuits...",
            completed: false,
            pointsReward: 20
          },
          {
            id: "l2-m2-c1",
            title: "Kirchhoff's Voltage Law (KVL)",
            content: "Understand how voltage behaves in closed loops...",
            completed: false,
            pointsReward: 20
          }
        ],
        quizId: "q2",
        unlocked: false
      }
    ],
    enrolledCount: 1245,
    rating: 4.7,
    totalPoints: 500
  },
  {
    id: "c2",
    title: "Introduction to Structural Analysis",
    description: "Master the principles of analyzing structures under various loads. Learn about beams, trusses, and frames.",
    category: "Civil Engineering",
    difficulty: "intermediate",
    imageUrl: "https://images.unsplash.com/photo-1518893494097-2d2bc3b25cbd?q=80&w=400&auto=format&fit=crop",
    modules: [
      {
        id: "m1-c2",
        title: "Basic Structural Components",
        description: "Understanding beams, columns, and connections",
        lessons: [
          {
            id: "l1-m1-c2",
            title: "Types of Structural Members",
            content: "Learn about the different types of structural elements...",
            completed: false,
            pointsReward: 10
          },
          {
            id: "l2-m1-c2",
            title: "Loads and Forces",
            content: "Understand different types of loads acting on structures...",
            completed: false,
            pointsReward: 15
          }
        ],
        quizId: "q3",
        unlocked: true
      }
    ],
    enrolledCount: 876,
    rating: 4.5,
    totalPoints: 450
  },
  {
    id: "c3",
    title: "Thermodynamics for Engineers",
    description: "Explore the laws of thermodynamics and their applications in engineering systems.",
    category: "Mechanical Engineering",
    difficulty: "advanced",
    imageUrl: "https://images.unsplash.com/photo-1591439045926-338a1802d9f3?q=80&w=400&auto=format&fit=crop",
    modules: [
      {
        id: "m1-c3",
        title: "Laws of Thermodynamics",
        description: "Understanding the four laws of thermodynamics",
        lessons: [
          {
            id: "l1-m1-c3",
            title: "Zeroth Law of Thermodynamics",
            content: "Learn about thermal equilibrium...",
            completed: false,
            pointsReward: 20
          },
          {
            id: "l2-m1-c3",
            title: "First Law: Conservation of Energy",
            content: "Understand how energy is conserved in thermodynamic processes...",
            completed: false,
            pointsReward: 25
          }
        ],
        quizId: "q4",
        unlocked: true
      }
    ],
    enrolledCount: 642,
    rating: 4.8,
    totalPoints: 600
  },
  {
    id: "c4",
    title: "Programming for Engineers",
    description: "Learn programming concepts specifically tailored for engineering applications.",
    category: "Computer Science",
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?q=80&w=400&auto=format&fit=crop",
    modules: [
      {
        id: "m1-c4",
        title: "Introduction to Programming",
        description: "Basic programming concepts for engineering applications",
        lessons: [
          {
            id: "l1-m1-c4",
            title: "Variables and Data Types",
            content: "Learn about different types of data and how to store them...",
            completed: false,
            pointsReward: 10
          }
        ],
        quizId: "q5",
        unlocked: true
      }
    ],
    enrolledCount: 1583,
    rating: 4.6,
    totalPoints: 400
  }
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    title: "Basic Circuit Elements Quiz",
    description: "Test your knowledge of resistors, capacitors, and inductors",
    moduleId: "m1-c1",
    questions: [
      {
        id: "q1-1",
        text: "What is the unit of resistance?",
        type: "multiple-choice",
        options: ["Ohm", "Ampere", "Volt", "Farad"],
        correctAnswer: "Ohm",
        explanation: "The ohm (symbol: Ω) is the unit of electrical resistance in the International System of Units (SI).",
        points: 10
      },
      {
        id: "q1-2",
        text: "In a series circuit, the current through each component is:",
        type: "multiple-choice",
        options: ["The same", "Different", "Zero", "Depends on the component"],
        correctAnswer: "The same",
        explanation: "In a series circuit, the same current flows through each component.",
        points: 10
      },
      {
        id: "q1-3",
        text: "According to Ohm's Law, if voltage increases while resistance remains constant, current will:",
        type: "multiple-choice",
        options: ["Increase", "Decrease", "Remain the same", "Become zero"],
        correctAnswer: "Increase",
        explanation: "Ohm's Law states that I = V/R. If V increases and R remains constant, I must increase.",
        points: 15
      },
      {
        id: "q1-4",
        text: "The primary function of a capacitor is to:",
        type: "multiple-choice",
        options: [
          "Store electrical energy",
          "Resist current flow",
          "Amplify voltage",
          "Generate electricity"
        ],
        correctAnswer: "Store electrical energy",
        explanation: "Capacitors store electrical energy in an electric field between their plates.",
        points: 15
      }
    ],
    timeLimit: 300,
    pointsReward: 50,
    completed: false
  },
  {
    id: "q2",
    title: "Kirchhoff's Laws Quiz",
    description: "Test your understanding of Kirchhoff's Current and Voltage Laws",
    moduleId: "m2-c1",
    questions: [
      {
        id: "q2-1",
        text: "Kirchhoff's Current Law (KCL) states that:",
        type: "multiple-choice",
        options: [
          "The sum of currents entering a node equals the sum of currents leaving it",
          "Current is always conserved in a closed loop",
          "Current is directly proportional to voltage",
          "Current always flows from positive to negative"
        ],
        correctAnswer: "The sum of currents entering a node equals the sum of currents leaving it",
        explanation: "KCL is based on the conservation of charge, stating that the algebraic sum of currents at any node is zero.",
        points: 20
      },
      {
        id: "q2-2",
        text: "In the circuit diagram, determine the current I3 using Kirchhoff's laws.",
        type: "diagram",
        diagram: "https://i.imgur.com/8HphSWo.png",
        options: ["1A", "2A", "3A", "4A"],
        correctAnswer: "2A",
        explanation: "By applying KCL at the top node and KVL around the loop, I3 = 2A.",
        points: 30
      }
    ],
    timeLimit: 300,
    pointsReward: 50,
    completed: false
  }
];

export const achievements: Achievement[] = [
  {
    id: "a1",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "trophy",
    criteria: "Complete 1 lesson",
    unlocked: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: "a2",
    title: "Quiz Wizard",
    description: "Score 100% on 3 quizzes",
    icon: "award",
    criteria: "Get perfect scores on 3 quizzes",
    unlocked: false,
    progress: 1,
    maxProgress: 3
  },
  {
    id: "a3",
    title: "Consistent Learner",
    description: "Maintain a 7-day study streak",
    icon: "calendar-check",
    criteria: "Study for 7 consecutive days",
    unlocked: false,
    progress: 5,
    maxProgress: 7
  },
  {
    id: "a4",
    title: "Circuit Master",
    description: "Complete the Circuit Theory course",
    icon: "badge-check",
    criteria: "Finish all modules in Circuit Theory",
    unlocked: false,
    progress: 1,
    maxProgress: 2
  },
  {
    id: "a5",
    title: "Point Collector",
    description: "Earn 1000 points total",
    icon: "star",
    criteria: "Accumulate 1000 points",
    unlocked: true,
    progress: 1250,
    maxProgress: 1000
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    userId: "u1",
    username: "ElectroWhiz",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=ElectroWhiz",
    points: 2540,
    level: 12,
    streak: 15,
    position: 1
  },
  {
    userId: "u2",
    username: "StructuralGenius",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=StructuralGenius",
    points: 2180,
    level: 10,
    streak: 8,
    position: 2
  },
  {
    userId: "u3",
    username: "ThermoKing",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=ThermoKing",
    points: 1950,
    level: 9,
    streak: 12,
    position: 3
  },
  {
    userId: "1",
    username: "student",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=student",
    points: 1250,
    level: 5,
    streak: 5,
    position: 4
  },
  {
    userId: "u5",
    username: "CircuitDesigner",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=CircuitDesigner",
    points: 1120,
    level: 5,
    streak: 3,
    position: 5
  }
];

export const userStats: UserStats = {
  totalPoints: 1250,
  quizzesCompleted: 12,
  quizzesCorrect: 9,
  streak: 5,
  topSubject: "Electrical Engineering",
  averageScore: 85,
  hoursStudied: 24
};
