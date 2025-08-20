import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { TermAttributeI } from '@/types'

const getData = async (token: string): Promise<TermAttributeI[]> => {
  const url = `${END_POINT.BASE_URL}/term/session`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: TermAttributeI[] = res.data.data

  return data
}

const termOptions = (token: string) => {
  return queryOptions({
    queryKey: ['termKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchTerm = (token: string) => {
  return useQuery(termOptions(token))
}
