import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { DashboardAttributeI } from '@/types/dashboard.interface'

const getData = async (token: string): Promise<DashboardAttributeI> => {
  const url = `${END_POINT.BASE_URL}/dashboard`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: DashboardAttributeI = res.data.data

  return data
}

const dashboardOptions = (token: string) => {
  return queryOptions({
    queryKey: ['DashboardKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchDashboard = (token: string) => {
  return useQuery(dashboardOptions(token))
}
