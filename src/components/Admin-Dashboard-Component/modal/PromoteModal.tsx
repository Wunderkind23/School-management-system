/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useAuth from '@/contexts/AuthContext'
import z from 'zod'
import { useFetchClass } from '@/hooks/global/useFetchClass'
import { usePromoteStudent } from '@/hooks/student-management/usePromoteStudent'
import { toast } from 'react-toastify'
import { PromoteStudentAttributeI } from '@/types/student.interface'

interface PromoteModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  studentId: number | null
}

const defaults = {
  classId: '',
}

const formSchema = z.object({
  classId: z.string().min(1, 'Student is required').transform(Number),
})

export function PromoteModal({ open, setOpen, studentId }: PromoteModalProps) {
  const { token } = useAuth()

  const { data: classData } = useFetchClass(token)

  const { mutate, isPending } = usePromoteStudent(token)

  const [formData, setFormData] = React.useState(defaults)

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

    const validatedData = result.data as PromoteStudentAttributeI

    mutate(
      { ...validatedData, studentId },
      {
        onSuccess: () => {
          toast.success('Student Promoted Successfully.')
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white shadow border border-gray-200">
        <DialogHeader>
          <DialogTitle>Promote Student</DialogTitle>
          <DialogDescription>Confirm promotion for the selected student.</DialogDescription>
        </DialogHeader>
        <form className="grid items-start gap-6">
          <div className="flex gap-20">
            <select
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              className="w-full border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select Class</option>
              {classData?.map((cls) => {
                return (
                  <option typeof="number" key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                )
              })}
            </select>
          </div>

          <Button
            disabled={isPending}
            className="border shadow"
            onClick={handleSubmit}
            type="submit"
          >
            Promote
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
