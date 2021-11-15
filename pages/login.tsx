import Layout from '~/components/Layout'
import React from 'react'
import Link from 'next/link'
import LayoutLogin from '~/components/LayoutLogin'
import FormLogin from '~/components/FormLogin'
import FormMessage from '~/components/FormMessage'

const Login = ({ msg }) => {
  return (
    <Layout title="entrar">
      <main className="grid-in-l lg:grid-in-main">
        <LayoutLogin>
          <div>
            {msg && msg == 'active' && (
              <FormMessage status="success">
                legal, sua conta está ativa.
              </FormMessage>
            )}

            {msg && msg == 'no-verified' && (
              <FormMessage status="error">
                Sua conta ainda não está ativa, verifique o seu e-mail.
              </FormMessage>
            )}

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

export async function getServerSideProps(context) {
  const { msg = null } = context.query

  return {
    props: { msg },
  }
}

export default Login
