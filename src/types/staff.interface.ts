export interface StaffAttributeI {
  isActive: boolean
  id: number
  fullName: string
  email: string
  phoneNumber: string
  classId: number
  gender: 'male' | 'female' | 'other' // You can adjust this union type as needed
  role: 'teacher' | string // If role can vary, keep it flexible
  employeeNumber: string
  specialization: string
  dateOfBirth: string // ISO date string
  passportUrl: string
}

export interface StaffResultsAttributeI {
  totalCount: number
  result: StaffAttributeI[]
}

export interface StaffCreationAttributeI {
  address: string
  classId: number
  email: string
  fullName: string
  gender: string
  password?: string
  phoneNumber: string
  role: string
  subjectIds: number[]
}
