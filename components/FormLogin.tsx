import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import Link from 'next/link'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import SubmitButton from '~/components/SubmitButton'
import FormMessage from '~/components/FormMessage'

interface IFormInput {
  email: string
  password: string
  nickname: string
  csrfToken: string
}

export default function FormLogin({ csrfToken, redirectTo, role }) {
  const [sending, setSending] = useState(false)
  const [showError, setShowError] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    setSending(true)

    const { email, password } = data

    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}${redirectTo}`,
      redirect: false,
      role,
    })

    if (res?.error) {
      setSending(false)
      setShowError(true)
    }
    if (res?.url) router.push(redirectTo)
  }

  return (
    <>
      {!sending && showError && (
        <FormMessage status="error">E-mail ou senha inválido.</FormMessage>
      )}

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

        <div>
          <SubmitButton btnLabel="entrar" sending={sending} />
        </div>
      </form>
    </>
  )
}
