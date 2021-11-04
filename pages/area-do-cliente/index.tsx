import Layout from '~/components/Layout'
import { useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import { links } from '~/components/SubMenuDashboard'

const Dashboard = ({ session }) => {
  return (
    <Layout title="dashboard">
      <main className="grid-in-l lg:grid-in-main">
        <div className="flex justify-center items-center h-full flex-col flex-wrap lg:flex-row">
          {links.map(l => (
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

export const isAuthenticated = async context => {
  const data = await getSession(context)
  return Dashboard.auth.role == data?.role
}

export async function getServerSideProps(context) {
  const data = await getSession(context)

  if (await isAuthenticated(context)) {
    return {
      props: {
        session: data.session,
      },
    }
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

Dashboard.auth = {
  role: 'user',
}

export default Dashboard
