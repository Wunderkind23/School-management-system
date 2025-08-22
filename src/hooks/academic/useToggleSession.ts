import { END_POINT } from '@/config/environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const toggleAcademicSession = async (id: number, token: string) => {
  const url = `${END_POINT.BASE_URL}/session/toggle/${id}`
  const response = await axios.patch(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export const useToggleAcademicSession = (token: string) => {
  return useMutation({
    mutationFn: (id: number) => toggleAcademicSession(id, token),
  })
}
