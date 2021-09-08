import Layout from '~/components/Layout'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { getCsrfToken } from 'next-auth/client'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

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
      <main className="grid-in-main relative">
        <div className="grid lg:grid-cols-4 h-full">
          <div className="col-start-2 col-span-1 flex items-center justify-center px-4 mb-10 lg:mb-0">
            <Image
              src="/logo-circle.jpg"
              layout="fixed"
              height="200"
              width="200"
              alt="logo bertolucci"
            />
          </div>

          <div className="col-start-3 col-span-1 mb-20 flex items-center">
            <div>
              <h1>entrar</h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                  {...register('csrfToken')}
                />
                <label htmlFor="email">*e-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e-mail"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  {...register('email', { required: true })}
                />

                <label htmlFor="password">*senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="senha"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  {...register('password', { required: true })}
                />

                <input type="submit" value="entrar" className="btn mt-10" />
              </form>

              <Link href="/cadastro">
                <a className="text-h2 my-10 inline-block">quero me cadastrar</a>
              </Link>
            </div>
          </div>
        </div>
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
