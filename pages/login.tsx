import Layout from '~/components/Layout'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
<<<<<<< HEAD
import React, { useEffect } from 'react'
=======
import React, { useState, useEffect } from 'react'
>>>>>>> d4bcd0854913f50193dcefce7ba5b2a2f65a0d23
import Link from 'next/link'
import { getCsrfToken } from 'next-auth/client'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
<<<<<<< HEAD
import LayoutLogin from '~/components/LayoutLogin'
=======
>>>>>>> d4bcd0854913f50193dcefce7ba5b2a2f65a0d23

interface IFormInput {
  email: string
  password: string
  nickname: string
  csrfToken: string
}

const Login = ({ csrfToken }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { email, password } = data

    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}/area-do-cliente`,
      redirect: false,
    })

    if (res?.error) console.log('res.error', res.error) // handleError(res.error)
    if (res.url) router.push('/area-do-cliente')
  }

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      console.log(router.query)
      // setLoginError(router.query.error) // Shown below the input field in my example
      // setEmail(router.query.email) // To prefill the email after redirect
    }
  }, [router])

  return (
    <Layout title="entrar">
      <main className="grid-in-l lg:grid-in-main">
        <LayoutLogin>
          <div>
            <h1>entrar</h1>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <input
                name="csrfToken"
                type="hidden"
                defaultValue={csrfToken}
                {...register('csrfToken')}
              />

              <div>
                <label htmlFor="email">*e-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e-mail"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  {...register('email', { required: true })}
                />
              </div>

              <div>
                <label htmlFor="password">*senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="senha"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  {...register('password', { required: true })}
                />
              </div>

              <input type="submit" value="entrar" className="btn" />
            </form>

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
