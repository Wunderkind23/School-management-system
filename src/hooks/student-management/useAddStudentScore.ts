import { END_POINT } from '@/config/environment'
import { StudentScoreAttributeI } from '@/types/student.interface'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const addStudentScore = async (props: StudentScoreAttributeI, token: string) => {
  const url = `${END_POINT.BASE_URL}/student/score`
  const response = await axios.post(url, props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useAddStudentScore = (token: string) => {
  return useMutation({
    mutationFn: (props: StudentScoreAttributeI) => addStudentScore(props, token),
  })
}
