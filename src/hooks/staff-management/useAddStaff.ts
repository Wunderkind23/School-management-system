import { END_POINT } from '@/config/environment'
import { StaffCreationAttributeI } from '@/types/staff.interface'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const addStaff = async (props: StaffCreationAttributeI, token: string) => {
  const url = `${END_POINT.BASE_URL}/auth/staff-registration`
  console.log(END_POINT.BASE_URL)
  const response = await axios.post(url, props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useAddStaff = (token: string) => {
  return useMutation({
    mutationFn: (props: StaffCreationAttributeI) => addStaff(props, token),
  })
}
