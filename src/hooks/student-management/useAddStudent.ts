import { END_POINT } from '@/config/environment'
import { StudentAttributeI } from '@/types/student.interface'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const addStudent = async (props: StudentAttributeI, token: string) => {
  const url = `${END_POINT.BASE_URL}/auth/student-registration`
  const response = await axios.post(url, props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useAddStudent = (token: string) => {
  return useMutation({
    mutationFn: (props: StudentAttributeI) => addStudent(props, token),
  })
}
