export interface DashboardAttributeI {
  totalStudent: number
  totalTeachers: number
  totalBursars: number
  totalMaleStudent: number
  totalFemaleStudent: number
  activities: {
    count: number
    rows: Activity[]
  }
  gradingSystem: GradingSystem[]
  scoreFormula: ScoreFormula
}

interface Activity {
  id: number
  name: string | null
  activityBy: string
  activityOn: string
  description: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

interface GradingSystem {
  id: number
  grade: string
  upperRange: number
  lowerRange: number
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

interface ScoreFormula {
  id: number
  examScore: number
  numberOfAssessment: number
  assessmentScore: number
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

interface Subject {
  name: string;
}

interface Classroom {
  id: number;
  name: string;
  level: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface TeacherDashboardAttributeI {
  allSubjects: Subject[];
  classRoom: Classroom;
  activities: Activity[]; // You can replace 'any' with a more specific type if you know the structure
}