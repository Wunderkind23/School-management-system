import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { StudentScoreResponse } from '@/types/student.interface'

const getData = async (id: number, token: string): Promise<StudentScoreResponse> => {
  const url = `${END_POINT.BASE_URL}/student/score/latest/${id}`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)

  const data: StudentScoreResponse = res.data.data

  return data
}

const studentScoreOptions = (id: number, token: string) => {
  return queryOptions({
    queryKey: ['studentScoreLatestKey', token, id],
    queryFn: () => getData(id, token),
  })
}

export const useFetchStudentScoreLatest = (id: number, token: string) => {
  return useQuery(studentScoreOptions(id, token))
}
