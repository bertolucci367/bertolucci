import Layout from '~/components/Layout'
import { redirectsNoUser } from '~/services/auth'
import { JWT_SECRET_KEY, USER_TOKEN } from '~/components/libs/constants'
import { parseCookies } from 'nookies'
import useSWR from 'swr'
import axios from 'axios'
import { jwtVerify } from 'jose'
import Link from 'next/link'
import { RiEditLine } from 'react-icons/ri'

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

const fetcher = async query => {
  const res = await axios.post('/api/graphql', { query })
  return res.data
}

const query = `
  query People {
    newUsers: people(
        stage: DRAFT,
        where: {AND: [{seller: null}], role: user},
        orderBy: createdAt_DESC
    ) {
      id
      name
      email
      company
      newsletter
      phone
      activeLogin
      seller {
        name
      }
    }

    users: people(
      stage: PUBLISHED
      orderBy: createdAt_DESC
      where: {NOT: [{seller: null}]}
    ) {
      id
      name
      email
      role
      company
      newsletter
      phone
      activeLogin
      seller {
        name
      }
    }
  }
  `

export default function Users() {
  const { data, error } = useSWR(query, fetcher)

  const TH = ({ children }) => {
    return <th className="py-2 px-4 text-left font-medium">{children}</th>
  }

  const TD = ({ children }) => {
    return <td className="py-2 px-4">{children}</td>
  }

  const List = ({ items = [] }) => {
    return (
      <>
        {items.map(
          ({
            id,
            name,
            email,
            company,
            newsletter,
            phone,
            seller,
            activeLogin,
          }) => (
            <tr key={id} className="border-t border-gray-200">
              <TD>
                <Link href={`/dashboard/users/${id}`}>
                  <a className="p-4 hover:bg-gray-100 inline-block">
                    <RiEditLine />
                  </a>
                </Link>
              </TD>
              <TD>{name}</TD>
              <TD>{email}</TD>
              <TD>{company}</TD>
              <TD>{seller ? seller.name : '-'}</TD>
              <TD>{phone}</TD>
              <TD>{newsletter ? 'Sim' : '-'}</TD>
              <TD>{activeLogin ? 'Sim' : 'Não'}</TD>
            </tr>
          ),
        )}
      </>
    )
  }

  return (
    <Layout title="usuários">
      <div className="grid-in-main">
        <table className="w-full">
          <thead>
            <tr>
              <TH> </TH>
              <TH>Nome</TH>
              <TH>E-mail</TH>
              <TH>Empresa</TH>
              <TH>Consultor</TH>
              <TH>Telefone</TH>
              <TH>Newsletter</TH>
              <TH>Ativo</TH>
            </tr>
          </thead>
          <tbody>
            {data && (
              <>
                <List items={data.newUsers} />
                <List items={data.users} />
              </>
            )}
          </tbody>
        </table>
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
