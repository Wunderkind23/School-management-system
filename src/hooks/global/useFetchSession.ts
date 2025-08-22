import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import {  SessionResponse } from '@/types'

const getData = async (token: string): Promise<SessionResponse> => {
  const url = `${END_POINT.BASE_URL}/session`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: SessionResponse = res.data.data

  return data
}

const sessionOptions = (token: string) => {
  return queryOptions({
    queryKey: ['sessionKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchSession = (token: string) => {
  return useQuery(sessionOptions(token))
}
