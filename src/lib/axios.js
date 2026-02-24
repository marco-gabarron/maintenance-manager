import axios from 'axios'

import {
  LOCAL_STORAGE_ACESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage.js'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

//It's common some applications to have more than one instance of axios, for example, one for public endpoints and another for authenticated endpoints. In this case, we can create an instance of axios and add the interceptor to it, so we don't have to worry about adding the interceptor to all instances of axios in the future.
//This way we can choose when to use an interceptor or not, for example, we can use the instance with the interceptor for authenticated endpoints and the instance without the interceptor for public endpoints. This is a good practice to avoid unnecessary overhead of adding the interceptor to all instances of axios, especially if we have many instances of axios in our application.
// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// })

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
  if (!accessToken) return request
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    return request
  }
})

//2 functions returned, one if success and another if error, we can use the error function to handle errors globally, for example, if we get a 401 error, we can redirect the user to the login page or show a message saying that the session has expired and the user needs to log in again. This way we don't have to handle this error in every request that requires authentication, we can handle it globally in one place.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const { isInitializing } = useContext(AuthContext)
    // if (isInitializing) null // or a loading spinner
    // if (!user) {
    //   return <Navigate to="/" /> // or a message saying that the user is not authenticated, but in this case we will just show the login form, so we can return null here
    // }

    const request = error.config

    //Check if refresh token is available, if it is, we can try to refresh the access token and retry the original request, if it is not, we can redirect the user to the login page or show a message saying that the session has expired and the user needs to log in again.
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      return Promise.reject(error)
      // Here you can also redirect the user to the login page if you are using a router, for example:
    }

    //check if the error is a 401 error, which means that the user is not authenticated or the token has expired
    if (
      error.response?.status === 401 &&
      !request._retry &&
      !request.url.includes('/refresh-token')
    ) {
      request._retry = true
      try {
        // Here you can also try to refresh the access token using the refresh token.
        const response = await api.post('/refresh-token', {
          refreshToken,
        })
        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken
        localStorage.setItem(LOCAL_STORAGE_ACESS_TOKEN_KEY, newAccessToken)
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken)
        //After refreshing the access token, we can retry the original request with the new access token.
        request.headers.Authorization = `Bearer ${newAccessToken}`
        //redo the original request with the new access token, we return the promise so we can handle the response or error of this request in the same way as any other request.
        return api(request)
      } catch (refreshError) {
        // If refreshing the access token fails, we can assume that the refresh token is also invalid or expired, so we can clear the tokens from local storage and redirect the user to the login page or show a message saying that the session has expired and the user needs to log in again.
        localStorage.removeItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
        // window.location.href = '/'
        console.error('Error refreshing access token:', refreshError)
      }
    }
    // window.location.href = '/'
    return Promise.reject(error)
  }
)
