import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  LOCAL_STORAGE_ACESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage.js'
import { api } from '@/lib/axios.js'

import { AuthContext } from './AuthContext.jsx'

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      // Simulate an API call with a delay
      const response = await api.post('/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const insertTokensIntoLocalStorage = (tokens) => {
    localStorage.setItem(LOCAL_STORAGE_ACESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
  }

  const removeTokensFromLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
  }
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return // No tokens, user is not authenticated}
        const response = await api.get(
          '/me'
          //Already being handled by the axios interceptor, but we need to make this call to verify if the token is valid and get the user data
          //   , {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
          // }
        )
        setUser(response.data)
      } catch (error) {
        setUser(null)
        toast.error('Authentication failed. Please log in again.')
        removeTokensFromLocalStorage()
        console.error('Error initializing authentication:', error)
      } finally {
        setIsInitializing(false)
      }
    }
    initializeAuth() // to use useEffect as an async function, we have to define an inner function and call it immediately
  }, [])

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        insertTokensIntoLocalStorage(loggedUser.tokens)
        setUser(loggedUser)
        toast.success('Login successful!')
      },
      onError: (error) => {
        toast.error(
          'Login failed. Please check your credentials and try again.'
        )
        console.error('Login error:', error)
      },
    })
  }

  const logout = () => {
    setUser(null)
    removeTokensFromLocalStorage()
    toast.success('Logged out successfully.')
  }
  return (
    <AuthContext.Provider
      value={{
        user: user,
        isInitializing: isInitializing,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
