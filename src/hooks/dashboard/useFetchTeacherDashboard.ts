import axios from 'axios'
import { useQuery, queryOptions } from '@tanstack/react-query'
import { END_POINT } from '@/config/environment'
import { TeacherDashboardAttributeI } from '@/types/dashboard.interface'

const getData = async (token: string): Promise<TeacherDashboardAttributeI> => {
  const url = `${END_POINT.BASE_URL}/staff/teacher-dashboard/:staffId`

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(url, config)
  const data: TeacherDashboardAttributeI = res.data.data

  return data
}

const dashboardOptions = (token: string) => {
  return queryOptions({
    queryKey: ['TDashboardKey', token],
    queryFn: () => getData(token),
  })
}

export const useFetchTeacherDashboard = (token: string) => {
  return useQuery(dashboardOptions(token))
}
