import Layout from '~/components/Layout'
import { signOut, useSession, getSession } from 'next-auth/react'
import { useEffect } from 'react'
import router from 'next/router'

const Dashboard = () => {
  return (
    <Layout title="dashboard">
      <main className="grid-in-main">
        <h1>Dashboard</h1>
        Signed in as <h1>{/* {session.user.email} ({session.user.name}) */}</h1>
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

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}

export default Dashboard
