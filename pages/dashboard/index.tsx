import Layout from '~/components/Layout'
import { signOut, useSession, getSession } from 'next-auth/react'
import { useEffect } from 'react'
import router from 'next/router'

const Dashboard = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (typeof window !== 'undefined' && loading) return null

  useEffect(() => {
    if (!session) router.push('/login')
  }, [session])

  if (session) {
    return (
      <Layout title="dashboard">
        <main className="grid-in-main">
          <h1>Dashboard</h1>
          Signed in as{' '}
          <h1>
            {session.user.email} ({session.user.name})
          </h1>
          <br />
          <button
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}`,
              })
            }
          >
            Sign out
          </button>
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
