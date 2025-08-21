import { END_POINT } from '@/config/environment'
import { TermRequestI } from '@/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const addTerm = async (props: TermRequestI, token: string) => {
  const url = `${END_POINT.BASE_URL}/term`
  const response = await axios.post(url, props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const useAddTerm = (token: string) => {
  return useMutation({
    mutationFn: (props: TermRequestI) => addTerm(props, token),
  })
}
