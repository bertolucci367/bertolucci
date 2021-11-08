import Layout from '~/components/Layout'
import React from 'react'
import Link from 'next/link'
import LayoutLogin from '~/components/LayoutLogin'
import FormLogin from '~/components/FormLogin'

const Login = () => {
  return (
    <Layout title="entrar">
      <main className="grid-in-l lg:grid-in-main">
        <LayoutLogin>
          <div>
            <h1>entrar</h1>

            <FormLogin redirectTo="/dashboard" role="user" />

            <Link href="/cadastro">
              <a className="text-h2 my-10 inline-block">quero me cadastrar</a>
            </Link>
          </div>
        </LayoutLogin>
      </main>
    </Layout>
  )
}

export default Login
