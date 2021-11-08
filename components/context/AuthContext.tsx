import { createContext, useEffect, useState } from 'react'
import { signInRequest, recoverUserInformation } from 'services/auth'
import { parseCookies, destroyCookie } from 'nookies'
import { USER_TOKEN } from '~/components/libs/constants'
import Router from 'next/router'

type SignInData = {
  email: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

interface AuthContextInterface {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextInterface)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { [USER_TOKEN]: token } = parseCookies()

    if (token) {
      recoverUserInformation(token).then(response => {
        setUser(response.user)
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    // fetch backend
    const { user } = await signInRequest({
      email,
      password,
    })

    setUser(user)

    Router.push('/dashboard')
  }

  async function signOut() {
    destroyCookie({}, USER_TOKEN, {
      path: '/', // THE KEY IS TO SET THE SAME PATH
    })
    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
