import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { StudentResponse } from '@/types/student.interface'

const getData = async (token: string): Promise<StudentResponse[]> => {
  const url = `${END_POINT.BASE_URL}/student/student-by-staff`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)

  const data: StudentResponse[] = res.data.data

  return data
}

const studentOptions = (token: string) => {
  return queryOptions({
    queryKey: ['studentKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchStudentByStaff = (token: string) => {
  return useQuery(studentOptions(token))
}
