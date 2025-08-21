import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

type StaffFormValues = {
  fullName: string
  email: string
  phone: string
  subjects: string[]
  assignedClass: string
  gender: string
  role: string
  address: string
  photo?: File
}

export default function StaffRegistrationForm() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  const form = useForm<StaffFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subjects: [],
      assignedClass: '',
      gender: '',
      role: '',
      address: '',
    },
  })

  const onSubmit = (values: StaffFormValues) => {
    console.log('Form Values:', values)
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-6">
      <CardContent>
        <h2 className="text-lg font-bold mb-4">Staff Registration</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: 'Full name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: 'Phone number is required',
                minLength: { value: 10, message: 'Too short' },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subjects Multi Select */}
            <FormField
              control={form.control}
              name="subjects"
              rules={{ validate: (value) => value.length > 0 || 'Select at least one subject' }}
              render={() => (
                <FormItem>
                  <FormLabel>Subjects</FormLabel>
                  <div className="flex flex-col space-y-2">
                    {['Math', 'English', 'Science', 'History'].map((subject) => (
                      <label key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={(checked) => {
                            let updated = [...selectedSubjects]
                            if (checked) updated.push(subject)
                            else updated = updated.filter((s) => s !== subject)
                            setSelectedSubjects(updated)
                            form.setValue('subjects', updated, { shouldValidate: true })
                          }}
                        />
                        <span>{subject}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assigned Class */}
            <FormField
              control={form.control}
              name="assignedClass"
              rules={{ required: 'Assigned class is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="JSS1">JSS1</SelectItem>
                      <SelectItem value="JSS2">JSS2</SelectItem>
                      <SelectItem value="SS1">SS1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              rules={{ required: 'Gender is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password (auto-generated) */}
            <div>
              <FormLabel>Password</FormLabel>
              <Input disabled value="Auto-generated" />
            </div>

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              rules={{ required: 'Address is required' }}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Photo */}
            <div className="col-span-2">
              <FormLabel>Upload Passport Photograph</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => form.setValue('photo', e.target.files?.[0])}
              />
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex justify-between mt-4">
              <Button type="button" variant="outline">
                Back
              </Button>
              <Button type="submit">Add Staff</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
