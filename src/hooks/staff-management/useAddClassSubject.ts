import { END_POINT } from '@/config/environment'
import { StudentScoreAttributeI } from '@/types/student.interface'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const addClassSubject = async (props: StudentScoreAttributeI, token: string) => {
  const url = `${END_POINT.BASE_URL}/class/subject`
  const response = await axios.post(url, props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useAddClassSubject = (token: string) => {
  return useMutation({
    mutationFn: (props: StudentScoreAttributeI) => addClassSubject(props, token),
  })
}
