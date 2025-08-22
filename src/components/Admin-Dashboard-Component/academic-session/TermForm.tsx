/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '@/contexts/AuthContext'
import { useState } from 'react'
import z from 'zod'
import { toast } from 'react-toastify'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

import { IoChevronDownCircleOutline } from 'react-icons/io5'

import { useFetchSession } from '@/hooks/global/useFetchSession'
import { TermRequestI } from '@/types'
import { useAddTerm } from '@/hooks/academic/useAddTerm'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import moment from 'moment'

const defaults = {
  academicSessionId: '',
  name: '',
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  academicSessionId: z.string().min(1, 'Academic session is required').transform(Number),
})

const TermForm = () => {
  const { token } = useAuth()

  const { mutate, isPending } = useAddTerm(token)

  const [formData, setFormData] = useState(defaults)
  const { data: academicSession } = useFetchSession(token)

  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

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

    const validatedData = result.data as TermRequestI

    const formattedStartDate = moment(startDate).format('YYYY-MM-DD')
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD')

    mutate(
      { ...validatedData, startDate: formattedStartDate, endDate: formattedEndDate },
      {
        onSuccess: () => {
          toast.success('Term added successfully.')
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
    <form className="p-4 w-[50%] border flex flex-col border-gray-200 shadow rounded-xl">
      <Label className="text-xl font-bold uppercase">Add a New Term</Label>

      <div className="flex  mt-4  justify-between">
        <Label className="text-xl font-normal" htmlFor="exam">
          Academic Session
        </Label>

        <select
          name="academicSessionId"
          onChange={handleChange}
          value={formData.academicSessionId}
          className="w-[50%] border shadow h-[40px] border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option>Select Session</option>
          {academicSession?.result.map((session) => {
            return (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            )
          })}
        </select>
      </div>

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

      <div className="flex mt-4 gap-[58px] justify-between ">
        <Label className="text-xl font-normal" htmlFor="date">
          Start Date
        </Label>
        <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-[50%] border shadow h-[40px] font-normal justify-between border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {startDate ? startDate.toLocaleDateString() : 'Select date'}
              <IoChevronDownCircleOutline />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white shadow overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                setStartDate(date)
                setOpenStartDate(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex mt-4 gap-[58px] justify-between ">
        <Label className="text-xl font-normal" htmlFor="date">
          End Date
        </Label>
        <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-[50%] border shadow h-[40px] font-normal justify-between border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {endDate ? endDate.toLocaleDateString() : 'Select date'}
              <IoChevronDownCircleOutline />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white shadow overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                setEndDate(date)
                setOpenEndDate(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <button
        disabled={isPending}
        onClick={handleSubmit}
        type="submit"
        className=" block mt-6 ml-30 py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-800 text-white self-end"
      >
        {isPending ? 'loading...' : '    Create Term'}
      </button>
    </form>
  )
}

export default TermForm
