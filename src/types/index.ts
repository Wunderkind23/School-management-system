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

export interface ClassSubject {
  subjectId: number
  termId: number
  classId: number
}

export interface ClassSubjectApiResponse {
  id: number
  classId: number
  termId: number
  subjectId: number
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
}

interface Term {
  id: number
  academicSessionId: number
  name: string
  isActive: boolean
  startDate: string // ISO 8601
  endDate: string // ISO 8601
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

interface Class {
  id: number
  name: string
  level: string
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

interface Subject {
  id: number
  name: string
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export interface ClassSubjectItem {
  id: number
  classId: number
  termId: number
  subjectId: number
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
  term: Term
  class: Class
  subject: Subject
}

export interface ClassSubjectResponse {
  data: ClassSubjectItem[]
}

export interface SessionAttributesI {
  id: number
  name: string
  isCurrent: boolean
  numberOfTerms: number
  terms?: Term[]
}

export interface SessionResponse {
  result: SessionAttributesI[]
  totalCount: number
}

export interface SessionRequestAttributesI {
  name: string
  numberOfTerms: number
}

export interface TermRequestI {
  name: string
  startDate: string
  endDate: string
  academicSessionId: number
}
