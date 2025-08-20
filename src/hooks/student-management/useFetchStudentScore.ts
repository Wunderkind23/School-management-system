import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { StudentScoreResponseAttributeI } from '@/types/student.interface'

const getData = async (token: string): Promise<StudentScoreResponseAttributeI> => {
  const url = `${END_POINT.BASE_URL}/student/score`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)

  const data: StudentScoreResponseAttributeI = res.data.data

  return data
}

const studentScoreOptions = (token: string) => {
  return queryOptions({
    queryKey: ['studentKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchStudentScore = (token: string) => {
  return useQuery(studentScoreOptions(token))
}
