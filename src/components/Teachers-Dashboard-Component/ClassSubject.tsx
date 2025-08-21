/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiLogOut, FiLoader } from 'react-icons/fi'
import { Label } from '../ui/label'
import useAuth from '@/contexts/AuthContext'
import { useState } from 'react'
import { useFetchSubject } from '@/hooks/global/userFetchSubject'
import { useFetchClass } from '@/hooks/global/useFetchClass'
import { useFetchTerm } from '@/hooks/global/useFetchTerm'
import z from 'zod'
import { toast } from 'react-toastify'
import { StudentScoreAttributeI } from '@/types/student.interface'
import { useAddClassSubject } from '@/hooks/staff-management/useAddClassSubject'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useFetchClassSubject } from '@/hooks/class/useFetchClassSubject'
import { useDeleteClassSubject } from '@/hooks/class/useDeleteClassSubject'

const defaults = {
  subjectId: '',
  classId: '',
  termId: '',
}

const formSchema = z.object({
  subjectId: z.string().min(1, 'Subject is required').transform(Number),
  termId: z.string().min(1, 'Term is required').transform(Number),
  classId: z.string().min(1, 'Term is required').transform(Number),
})

const ClassSubject = () => {
  const { token } = useAuth()
  const { data: classData } = useFetchClass(token)
  const { data: subjectData } = useFetchSubject(token)
  const { data: termData } = useFetchTerm(token)
  const { data: classes } = useFetchClass(token)
  const { data: classSubject, refetch } = useFetchClassSubject(token)

  const { mutate } = useAddClassSubject(token)
  const { mutate: deleteClass, isPending } = useDeleteClassSubject(token)

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
          toast.success('Class subject added successfully.')
          setFormData(defaults)
          refetch()
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

  const handleDelete = (id: number) => {
    deleteClass(id, {
      onSuccess: () => {
        toast.success('Class subject delete successfully.')
        refetch()
      },
      onError: (error: any) => {
        // If API sends a custom error message
        console.log(error)
        const message = error?.response?.data?.message || 'Something went wrong. Please try again.'
        toast.error(message)
      },
    })
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-4 font-sans w-full
    "
    >
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
        <div>Enter Class Subject</div>
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
            Term
          </Label>

          <select
            name="termId"
            onChange={handleChange}
            value={formData.termId}
            className="w-[50%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
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
        </div>

        <div className="flex mt-4 gap-[58px] ">
          <Label className="text-xl font-normal" htmlFor="exam">
            Subject
          </Label>

          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            className="w-[50%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
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

        <div className="flex gap-20 mt-4">
          <Label className="text-xl font-normal" htmlFor="exam">
            class
          </Label>

          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="w-[50%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {classes?.map((classRoom) => {
              return <option value={classRoom.id}>{classRoom.name}</option>
            })}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className=" block mt-6 ml-30 py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-800 text-white"
        >
          Enter Class Subjects
        </button>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Term</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {classSubject?.map((subject, index) => (
              <tr
                key={index}
                // className={`border ${staff.isActive ? ' border-white' : 'border border-red-500'}`}
              >
                <td className="px-4 py-2">{subject?.subject?.name}</td>
                <td className="px-4 py-2">{subject?.term?.name}</td>
                <td className="px-4 py-2">{subject?.class?.name}</td>
                {/* <td className="px-4 py-2">{staff.employeeNumber}</td> */}
                <td className="px-4 py-2">
                  <Popover>
                    <PopoverTrigger>⋯</PopoverTrigger>
                    <PopoverContent className="bg-red">
                      <div className="gap-2 bg-white p-2 flex shadow-sm rounded-sm">
                        <button
                          disabled={isPending}
                          onClick={() => {
                            handleDelete(subject.id)
                          }}
                          className="py-1 px-2 font-bold text-white border rounded-sm bg-red-600 text-[7px] "
                        >
                          {isPending ? <FiLoader /> : 'Delete'}
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClassSubject
