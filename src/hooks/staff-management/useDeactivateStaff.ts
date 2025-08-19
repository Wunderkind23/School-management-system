import { END_POINT } from '@/config/environment'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const deactivateStaff = async (id: number, token: string) => {
  const url = `${END_POINT.BASE_URL}/user-management/staff/deactivate/${id}`

  const response = await axios.post(
    url,
    {},
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export const useDeactivateStaff = (token: string) => {
  return useMutation({
    mutationFn: (id: number) => deactivateStaff(id, token),
  })
}
