import axios from 'axios'

type SignInRequestData = {
  email: string
  password: string
}

export async function signInRequest({ email, password }: SignInRequestData) {
  const { data } = await axios.post('/api/auth/login', { email, password })

  return {
    user: data.user,
  }
}

export async function recoverUserInformation(token) {
  const {
    data: { payload },
  } = await axios.post('/api/auth/verify', { token })

  return { user: payload.user }
}

export async function redirectsNoUser() {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}
