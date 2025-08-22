import { TermAttributeI } from '.'

interface StudentClass {
  id: number
  name: string
  level: string
  createdAt: string
  updatedAt: string
}

interface Student {
  id: number
  surname: string
  firstName: string
  middleName: string
  dateOfBirth: string
  classId: number
  gender: string
  role: string
  admissionNumber: string
  email: string
  guardianName: string
  guardianPhone: string
  address: string
  passportUrl: string
  createdAt: string
  updatedAt: string
  class: StudentClass
}

interface Academic {
  subject: string
  studentScore: number
  ca: number
  exam: number
  grade: string
  highestScore: number
  lowestScore: number
  averageScore: number
  position: number
}

export interface StudentReport {
  student: Student
  className: string
  academics: Academic[]
  sessionInfo: TermAttributeI
  totalSubject: number
  totalClassmates: number
  totalObtainable: number
  totalScore: number
  studentAveragePercent: number
  classAverage: number
  studentAverage: number
  studentPosition: number
}
