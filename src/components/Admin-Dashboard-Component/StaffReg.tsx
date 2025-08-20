/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '@/contexts/AuthContext'
import { useFetchClass } from '@/hooks/global/useFetchClass'
import { useFetchSubject } from '@/hooks/global/userFetchSubject'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useAddStaff } from '@/hooks/staff-management/useAddStaff'

const StaffReg = () => {
  const { token } = useAuth()
  const { data: subjects } = useFetchSubject(token)
  const { data: classes } = useFetchClass(token)
  const { mutate } = useAddStaff(token)

  const defaults = {
    fullName: '',
    email: '',
    phoneNumber: '',
    subjectIds: [] as string[],
    classId: '',
    gender: '',
    role: '',
    password: 'Auto-generated',
    address: '',
  }

  const [formData, setFormData] = useState(defaults)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)

    setFormData((prev) => ({
      ...prev,
      subjectIds: selectedOptions,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert IDs from string to number
    const convertedData = {
      ...formData,
      subjectIds: formData.subjectIds.map((id) => Number(id)),
      classId: Number(formData.classId),
      password: formData.fullName.trim(),
    }

    // TODO: FIX THE  Validation
    const errors: string[] = []

    if (!formData.fullName.trim()) errors.push('Full name is required.')
    if (!formData.email.includes('@')) errors.push('Invalid email address.')
    if (!formData.phoneNumber.trim()) errors.push('Phone number is required.')
    if (!formData.gender.trim()) errors.push('Gender is required.')
    if (!formData.role.trim()) errors.push('Role is required.')
    if (!formData.address.trim()) errors.push('Address is required.')
    if (isNaN(convertedData.classId)) errors.push('Class ID must be a number.')
    if (!formData.subjectIds.length) errors.push('At least one subject must be selected.')
    if (convertedData.subjectIds.some((id) => isNaN(id)))
      errors.push('All subject IDs must be valid numbers.')

    if (errors.length > 0) {
      toast.error(errors[0])
      return
    }

    mutate(
      { ...convertedData },
      {
        onSuccess: () => {
          toast.success('Staff Added Successfully.')
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
    <>
      {/* <StaffRegistrationForm /> */}
      <div className="p-6 bg-pink-50 min-h-screen">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-1 rounded-full border border-gray-300 w-64 text-sm focus:outline-none"
            />
            <span className="absolute ml-56 text-gray-400 text-xs">🔍</span>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/30"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
              Logout
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Staff Registration</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
            {/* Left Side Inputs */}
            <div className="col-span-2 space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <select
                name="subjects"
                multiple
                value={formData.subjectIds}
                onChange={handleMultiSelectChange}
                className="w-full border h-[300px] border-gray-300 rounded px-3 py-2 text-sm"
              >
                {subjects?.map((subject) => (
                  <option className="py-2" key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>

              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                {classes?.map((classRoom) => {
                  return <option value={classRoom.id}>{classRoom.name}</option>
                })}
              </select>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="">Role</option>
                <option value="teacher">Teacher</option>
                <option value="bursar">Bursar</option>
              </select>

              <input
                type="text"
                name="password"
                value={formData.password}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-400"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
                >
                  Add Staff
                </button>
              </div>
            </div>

            {/* Upload Section */}
            <div
              onClick={handleClick}
              className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 h-64 cursor-pointer hover:bg-gray-50"
            >
              {preview ? (
                <img src={preview} alt="Passport Preview" className="h-full object-cover rounded" />
              ) : (
                <span className="text-sm text-gray-500 text-center">
                  Upload Passport Photograph
                </span>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default StaffReg
