import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { StudentResponse } from '@/types/student.interface'

const getData = async (id: number, token: string): Promise<StudentResponse> => {
  const url = `${END_POINT.BASE_URL}/student/${id}`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)

  const data: StudentResponse = res.data.data

  return data
}

const studentOptions = (id: number, token: string) => {
  return queryOptions({
    queryKey: ['studentSingleKey', id, token],
    queryFn: () => getData(id, token),
  })
}

export const useFetchSingleStudent = (id: number, token: string) => {
  return useQuery(studentOptions(id, token))
}
