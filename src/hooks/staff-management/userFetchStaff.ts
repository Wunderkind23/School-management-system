import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { StaffResultsAttributeI } from '@/types/staff.interface'

const getData = async (token: string): Promise<StaffResultsAttributeI> => {
  const url = `${END_POINT.BASE_URL}/staff`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)

  const data: StaffResultsAttributeI = res.data.data

  return data
}

const staffOptions = (token: string) => {
  return queryOptions({
    queryKey: ['staffKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchStaff = (token: string) => {
  return useQuery(staffOptions(token))
}
