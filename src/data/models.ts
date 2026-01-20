
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  imageUrl: string;
  modules: Module[];
  enrolledCount: number;
  rating: number;
  totalPoints: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quizId: string;
  unlocked: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  completed: boolean;
  pointsReward: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  questions: Question[];
  timeLimit?: number; // In seconds
  pointsReward: number;
  completed: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "fill-blank" | "diagram";
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  diagram?: string; // URL to diagram image
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  position?: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  completedQuizzes: string[];
  currentStreak: number;
  lastActivityDate?: Date;
  pointsEarned: number;
}

export interface UserStats {
  totalPoints: number;
  quizzesCompleted: number;
  quizzesCorrect: number;
  streak: number;
  topSubject: string;
  averageScore: number;
  hoursStudied: number;
}
