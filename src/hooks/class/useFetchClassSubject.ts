import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { ClassSubjectItem } from '@/types'

const getData = async (token: string): Promise<ClassSubjectItem[]> => {
  const url = `${END_POINT.BASE_URL}/class/subject/get-by-teacher`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: ClassSubjectItem[] = res.data.data

  return data
}

const classSubjectOptions = (token: string) => {
  return queryOptions({
    queryKey: ['classSubjectKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchClassSubject = (token: string) => {
  return useQuery(classSubjectOptions(token))
}
