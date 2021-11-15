import Link from 'next/link'
import { parseCookies } from 'nookies'
import Layout from '~/components/Layout'
import { linksPermissions } from '~/components/SubMenuDashboard'
import { USER_TOKEN } from '~/components/libs/constants'
import { redirectsNoUser } from '~/services/auth'
import { useContext } from 'react'
import { AuthContext } from '~/components/context/AuthContext'

const Dashboard = ({}) => {
  const { user } = useContext(AuthContext)

  return (
    <Layout title="dashboard">
      <main className="grid-in-l lg:grid-in-main">
        <div className="flex justify-center items-center h-full flex-col flex-wrap lg:flex-row">
          {linksPermissions(user).map(l => (
            <Link key={l.path} href={l.path}>
              <a className="btn m-10">
                <span className="text-14px ">{l.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { [USER_TOKEN]: token } = parseCookies(context)

  if (!token) {
    return redirectsNoUser()
  }

  return {
    props: {},
  }
}

export default Dashboard