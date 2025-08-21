import { END_POINT } from '@/config/environment'
import { SessionRequestAttributesI } from '@/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const addAcademicSession = async (props: SessionRequestAttributesI, token: string) => {
  const url = `${END_POINT.BASE_URL}/session`
  const response = await axios.post(url, props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useAddAcademicSession = (token: string) => {
  return useMutation({
    mutationFn: (props: SessionRequestAttributesI) => addAcademicSession(props, token),
  })
}
