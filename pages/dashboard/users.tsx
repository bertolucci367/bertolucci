import Layout from '~/components/Layout'
import LayoutLogin from '~/components/LayoutLogin'
import { ConsultantsByUser } from '~/graphcms/index'
import { useContext } from 'react'
import { AuthContext } from '~/components/context/AuthContext'
import { redirectsNoUser } from '~/services/auth'
import { JWT_SECRET_KEY, USER_TOKEN } from '~/components/libs/constants'
import { parseCookies } from 'nookies'
import useSWR from 'swr'
import axios from 'axios'
import { jwtVerify } from 'jose'

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

const fetchWithUser = async (query, user) => {
  const variables = { id: user.id }
  const res = await axios.post('/api/graphql', { query, variables })
  const { values } = res.data

  return values
}

export default function Users() {
  const { user } = useContext(AuthContext)

  const { data, error } = useSWR(
    user ? [ConsultantsByUser, user] : null,
    fetchWithUser,
  )

  return (
    <Layout title="usuários">
      <div className="grid-in-main">
        <LayoutLogin>
          <h1>Somente vendedor</h1>
        </LayoutLogin>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { [USER_TOKEN]: token } = parseCookies(context)

  if (!token) {
    return redirectsNoUser()
  }

  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET_KEY),
  )

  const _user = verified.payload.user as User

  if (!_user.role.includes('seller')) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}
