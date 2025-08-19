import { jwtDecode } from 'jwt-decode'

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false
  }
  const decodedToken = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000
  return decodedToken.exp > currentTime
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}
