/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiLogOut } from 'react-icons/fi'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import useAuth from '@/contexts/AuthContext'
import { useState } from 'react'
import { useFetchSubject } from '@/hooks/global/userFetchSubject'
import { useFetchClass } from '@/hooks/global/useFetchClass'
import { useFetchTerm } from '@/hooks/global/useFetchTerm'
import { useFetchGrade } from '@/hooks/global/useFetchGradeSystem'
import z from 'zod'
import { toast } from 'react-toastify'
import { useAddStudentScore } from '@/hooks/student-management/useAddStudentScore'
import { StudentScoreAttributeI } from '@/types/student.interface'
import { useFetchStudentByStaff } from '@/hooks/student-management/userFetchStudentByStaff'

const defaults = {
  subjectId: '',
  studentId: '',
  termId: '',
  contAssessment: '',
  examScore: '',
  grade: '',
  total: 0,
}

const formSchema = z
  .object({
    subjectId: z.string().min(1, 'Subject is required').transform(Number),
    studentId: z.string().min(1, 'Student is required').transform(Number),
    termId: z.string().min(1, 'Term is required').transform(Number),
    contAssessment: z.string().min(1, 'Continuous Assessment score is required').transform(Number),
    examScore: z.string().min(1, 'Exam Score is required').transform(Number),
    grade: z.string().min(1, 'Grade is required'),
    total: z.string().min(1, 'Total Score is required').transform(Number),
  })
  .refine(
    (data) => {
      const total = data.contAssessment + data.examScore
      return total <= 100
    },
    {
      message: 'Total score (Exam + CA) must not exceed 100',
      path: ['total'],
    },
  )
  .refine((data) => data.total === data.contAssessment + data.examScore, {
    message: 'Total must equal the sum of CA and Exam score',
    path: ['total'],
  })

const ResultEntry = () => {
  const { token } = useAuth()
  const { data } = useFetchStudentByStaff(token)
  const { data: classData } = useFetchClass(token)
  const { data: subjectData } = useFetchSubject(token)
  const { data: termData } = useFetchTerm(token)
  const { data: gradesData } = useFetchGrade(token)
  const { mutate, isPending } = useAddStudentScore(token)
  const [formData, setFormData] = useState(defaults)

  // Handle text/select changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = formSchema.safeParse(formData)

    if (!result.success) {
      const errors = result.error.format()
      // Show first error in toast
      for (const field in errors) {
        if (field !== '_errors' && errors[field]?._errors?.length) {
          toast.error(errors[field]._errors[0])
          break
        }
      }
      return
    }

    const validatedData = result.data as StudentScoreAttributeI

    mutate(
      { ...validatedData },
      {
        onSuccess: () => {
          toast.success('Student Score Added Successfully.')
          setFormData(defaults)
        },
        onError: (error: any) => {
          // If API sends a custom error message
          console.log(error)
          const message =
            error?.response?.data?.message || 'Something went wrong. Please try again.'
          toast.error(message)
        },
      },
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans w-full">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-2/3 focus:outline-none "
        />
        <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>

      {/* Result */}
      <div className="flex justify-between items-center">
        <div>Enter Student Result</div>
        <div className="flex gap-4">
          <select
            name="termId"
            onChange={handleChange}
            value={formData.termId}
            className=" border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option>Select Term</option>
            {termData?.map((term) => {
              return (
                <option key={term.id} value={term.id}>
                  {term.name}
                </option>
              )
            })}
          </select>

          <select
            name="classId"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option>Class</option>
            {classData?.map((classRoom) => {
              return (
                <option key={classRoom.id} value={classRoom.id}>
                  {classRoom.name}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {/* Form input */}
      <form className="p-4">
        <div className="flex gap-20">
          <Label className="text-xl font-normal" htmlFor="exam">
            Student's Name
          </Label>

          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-[50%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Student</option>
            {data?.map((student) => {
              return (
                <option typeof="number" key={student.id} value={student.id}>
                  {student.firstName} {student.surname}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex mt-4 gap-[154px] ">
          <Label className="text-xl font-normal" htmlFor="exam">
            Subject
          </Label>

          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            className="w-[25%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Subject</option>
            {subjectData?.map((subject) => {
              return (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex mt-4  justify-between">
          <div className="flex  max-w-sm  items-end gap-[185px]">
            <Label className="text-xl font-normal" htmlFor="exam">
              Test
            </Label>
            <Input
              name="contAssessment"
              value={formData.contAssessment}
              onChange={handleChange}
              className=" h-[40px] w-[30%] shadow  border-gray-200"
              id="exam"
              type="number"
            />
          </div>

          <div className="flex w-1/2 max-w-sm justify-end items-end gap-[172px]">
            <Label className="text-xl font-normal" htmlFor="exam">
              Exam
            </Label>
            <Input
              onChange={handleChange}
              value={formData.examScore}
              name="examScore"
              className=" h-[40px] shadow w-[30%] border border-gray-200"
              id="exam"
              type="number"
            />
          </div>
        </div>

        <div className="flex mt-4  justify-between">
          <div className="flex max-w-sm  items-end gap-[166px]">
            <Label className="text-xl font-normal" htmlFor="exam">
              Grade
            </Label>

            <select
              name="grade"
              onChange={handleChange}
              value={formData.grade}
              className=" border shadow border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option>Select Grade</option>
              {gradesData?.map((grade) => {
                return (
                  <option key={grade.id} value={grade.grade}>
                    {grade.grade}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="flex w-1/2 max-w-sm justify-end items-end gap-[172px]">
            <Label className="text-xl font-normal" htmlFor="exam">
              Total
            </Label>
            <Input
              name="total"
              className=" h-[40px] shadow w-[30%] border border-gray-200"
              id="exam"
              type="number"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          disabled={isPending}
          onClick={handleSubmit}
          type="submit"
          className=" block mx-auto mt-6 py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-800 hover:text-white"
        >
          {isPending ? 'loading' : '   Enter Result'}
        </button>
      </form>
    </div>
  )
}

export default ResultEntry
