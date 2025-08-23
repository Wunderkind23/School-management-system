/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import useAuth from '@/contexts/AuthContext'
import { useAddAcademicSession } from '@/hooks/academic/useAddSession'
import { SessionRequestAttributesI } from '@/types'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { toast } from 'react-toastify'
import z from 'zod'

const defaults = {
  name: '',
  numberOfTerms: '',
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  numberOfTerms: z.string().min(1, 'Number of term is required').transform(Number),
})

const AcademicSessionForm = () => {
  const { token } = useAuth()

  const { mutate, isPending } = useAddAcademicSession(token)

  const [formData, setFormData] = useState(defaults)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = formSchema.safeParse(formData)

    if (!result.success) {
      const errors = result.error.format()
      for (const field in errors) {
        if (field !== '_errors' && errors[field]?._errors?.length) {
          toast.error(errors[field]._errors[0])
          break
        }
      }
      return
    }

    const validatedData = result.data as SessionRequestAttributesI

    mutate(
      { ...validatedData },
      {
        onSuccess: () => {
          toast.success('Session added successfully.')
          setFormData(defaults)
        },
        onError: (error: any) => {
          // If API sends a custom error message
          const message =
            error?.response?.data?.message || 'Something went wrong. Please try again.'
          toast.error(message)
        },
      },
    )
  }

  return (
    <form className="p-4 w-[50%] border flex flex-col border-gray-200 shadow rounded-xl self-start">
      <Label className="text-xl font-bold uppercase">Add a New Academic Session</Label>

      <div className="flex gap-20 mt-4 justify-between">
        <Label className="text-xl font-normal" htmlFor="exam">
          Name
        </Label>

        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-[50%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex gap-20 mt-4 justify-between">
        <Label className="text-xl font-normal" htmlFor="exam">
          Number Of Terms
        </Label>

        <Input
          name="numberOfTerms"
          value={formData.numberOfTerms}
          onChange={handleChange}
          className="w-[50%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className=" block mt-6 ml-30 py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-800 text-white self-end"
      >
        {isPending ? 'loading' : 'Create Session'}
      </button>
    </form>
  )
}

export default AcademicSessionForm
