import { END_POINT } from '@/config/environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const deleteStudent = async (id: number, token: string) => {
  const url = `${END_POINT.BASE_URL}/user-management/student/delete/${id}`

  const response = await axios.delete(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useDeleteStudent = (token: string) => {
  return useMutation({
    mutationFn: (id: number) => deleteStudent(id, token),
  })
}
