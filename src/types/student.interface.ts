export enum GenderEnum {
  Male = 'male',
  Female = 'female',
}

export interface StudentAttributeI {
  surname: string
  firstName: string
  middleName: string
  dateOfBirth: Date | string // Use `Date` if you're working directly with JS dates, otherwise `string` for ISO format
  classId: number
  gender: string
  admissionNumber: number
  email: string
  guardianName: string
  guardianPhone: string
  address: string
  passportUrl?: string
  password?: string
}

export interface StudentResponse {
  id: number
  surname: string
  firstName: string
  middleName: string
  dateOfBirth: string // ISO date string
  classId: number
  gender: 'male' | 'female' | string // Expand or restrict as needed
  role: 'student' | string // assuming role might be more than 'student' in future
  admissionNumber: string // stored as string even if numeric
  email: string
  guardianName: string
  guardianPhone: string
  address: string
  passportUrl: string
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
}

export interface StudentApiResponseAttributeI {
  result: StudentResponse[]
  totalCount: number
}

export interface StudentScoreAttributeI {
  subjectId: number
  studentId: number
  termId: number
  contAssessment: number
  examScore: number
  grade: string
  total: number
}

interface StudentScoreResponse {
  id: number
  subjectId: number
  studentId: number
  termId: number
  classId: number
  contAssessment: number
  examScore: number
  grade: string
  total: number
  student: StudentResponse
}

export interface StudentScoreResponseAttributeI {
  result: StudentScoreResponse[]
  totalCount: number
}
