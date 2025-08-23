import { END_POINT } from '@/config/environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const deleteStudentScore = async (id: number, token: string) => {
  const url = `${END_POINT.BASE_URL}/student/score/${id}`

  const response = await axios.delete(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useDeleteStudentSubjectScore = (token: string) => {
  return useMutation({
    mutationFn: (id: number) => deleteStudentScore(id, token),
  })
}
