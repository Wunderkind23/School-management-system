import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { GradeAttributeI } from '@/types'

const getData = async (token: string): Promise<GradeAttributeI[]> => {
  const url = `${END_POINT.BASE_URL}/grade-system`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: GradeAttributeI[] = res.data.data

  return data
}

const gradeOptions = (token: string) => {
  return queryOptions({
    queryKey: ['gradeKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchGrade = (token: string) => {
  return useQuery(gradeOptions(token))
}
