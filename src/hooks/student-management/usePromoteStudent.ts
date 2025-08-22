import { END_POINT } from '@/config/environment'
import { PromoteStudentAttributeI } from '@/types/student.interface'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const promoteStudent = async (data: PromoteStudentAttributeI, token: string) => {
  const url = `${END_POINT.BASE_URL}/user-management/student/promote`

  const response = await axios.post(
    url,
    { ...data },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export const usePromoteStudent = (token: string) => {
  return useMutation({
    mutationFn: (data: PromoteStudentAttributeI) => promoteStudent(data, token),
  })
}
