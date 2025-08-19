// src/hooks/useLogin.ts
import { END_POINT } from '@/config/environment'
import useAuth from '@/contexts/AuthContext'
import { loginProps } from '@/types/auth.interface'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const loginUser = async (props: loginProps) => {
  const url = `${END_POINT.BASE_URL}/auth/login`
  console.log(END_POINT.BASE_URL)
  const response = await axios.post(url, props)
  console.log(response.data)
  return response.data
}

export const useLogin = () => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      login(res.data.accessToken, res.data.user)
    },
  })
}
