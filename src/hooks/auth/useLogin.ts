// src/hooks/useLogin.ts
import { END_POINT } from '@/config/environment'
// import useAuth from '@/contexts/AuthContext'
import { loginProps } from '@/types/auth.interface'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const loginUser = async (props: loginProps) => {
  const url = `${END_POINT.BASE_URL}/auth/login`
  const response = await axios.post(url, props)
  return response.data
}

export const useLogin = () => {
  // const { login } = useAuth()

  return useMutation({
    mutationFn: loginUser,
    // onSuccess: (res) => {
    //   console.log(res)
    //   login(res.data.accessToken, res.data.user)
    // },
  })
}
