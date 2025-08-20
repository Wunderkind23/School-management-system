import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { SubjectAttributeI } from '@/types/subject.interface'

const getData = async (token: string): Promise<SubjectAttributeI[]> => {
  const url = `${END_POINT.BASE_URL}/subject`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: SubjectAttributeI[] = res.data.data

  return data
}

const subjectOptions = (token: string) => {
  return queryOptions({
    queryKey: ['subjectKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchSubject = (token: string) => {
  return useQuery(subjectOptions(token))
}
