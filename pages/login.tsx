import Layout from '~/components/Layout'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Link from 'next/link'
import { getCsrfToken } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import LayoutLogin from '~/components/LayoutLogin'
import FormLogin from '~/components/FormLogin'

const Login = ({ csrfToken }) => {
  return (
    <Layout title="entrar">
      <main className="grid-in-l lg:grid-in-main">
        <LayoutLogin>
          <div>
            <h1>entrar</h1>

            <FormLogin
              csrfToken={csrfToken}
              redirectTo="/area-do-cliente"
              role="user"
            />

            <Link href="/cadastro">
              <a className="text-h2 my-10 inline-block">quero me cadastrar</a>
            </Link>
          </div>
        </LayoutLogin>
      </main>
    </Layout>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default Login
