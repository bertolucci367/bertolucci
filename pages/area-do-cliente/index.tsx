import Layout from '~/components/Layout'
import { useSession, getSession } from 'next-auth/client'
import { useEffect } from 'react'
import router from 'next/router'
import Link from 'next/link'
import { links } from '~/components/SubMenuDashboard'

const Dashboard = () => {
  const [session, loading] = useSession()

  if (typeof window !== 'undefined' && loading) return null

  useEffect(() => {
    console.log(session)
    if (!session) router.push('/login')
  }, [session])

  if (session) {
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

  return <Layout title="dashboard"></Layout>
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}

export default Dashboard
