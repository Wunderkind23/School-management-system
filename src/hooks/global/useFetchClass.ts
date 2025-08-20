import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { ClassAttributeI } from '@/types'

const getData = async (token: string): Promise<ClassAttributeI[]> => {
  const url = `${END_POINT.BASE_URL}/class`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: ClassAttributeI[] = res.data.data

  return data
}

const classOptions = (token: string) => {
  return queryOptions({
    queryKey: ['classKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchClass = (token: string) => {
  return useQuery(classOptions(token))
}
