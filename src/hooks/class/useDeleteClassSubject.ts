import { END_POINT } from '@/config/environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const deleteClassSubject = async (id: number, token: string) => {
  const url = `${END_POINT.BASE_URL}/class/subject/delete/${id}`
  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useDeleteClassSubject = (token: string) => {
  return useMutation({
    mutationFn: (id: number) => deleteClassSubject(id, token),
  })
}
