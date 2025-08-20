export interface ClassAttributeI {
  id: number
  name: string
  level: string
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
}

export interface TermAttributeI {
  id: number
  academicSessionId: number
  name: string
  isActive: boolean
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
}

export interface GradeAttributeI {
  id: number
  grade: string
  upperRange: number
  lowerRange: number
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
}
