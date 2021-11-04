import Layout from '~/components/Layout'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { links } from '~/components/SubMenuDashboard'

export default function AdminDashboard({ session }) {
  return (
    <Layout title="dashboard">
      <main className="grid-in-l lg:grid-in-main">
        <h1>Role: {session && session?.role}</h1>
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
  return AdminDashboard.auth.role == data?.role
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
      destination: '/admin/login',
      permanent: false,
    },
  }
}

AdminDashboard.auth = {
  role: 'admin',
}
