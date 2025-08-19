import { END_POINT } from '@/config/environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const promoteStudent = async (id: number, token: string) => {
  const url = `${END_POINT.BASE_URL}/user-management/student/promote/${id}`

  const response = await axios.post(
    url,
    {},
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
    mutationFn: (id: number) => promoteStudent(id, token),
  })
}
