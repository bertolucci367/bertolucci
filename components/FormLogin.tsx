import { useForm } from 'react-hook-form'
import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from './context/AuthContext'

import { useRouter } from 'next/router'
import SubmitButton from '~/components/SubmitButton'
import FormMessage from '~/components/FormMessage'

interface IFormInput {
  email: string
  password: string
  nickname: string
}

export default function FormLogin({ redirectTo, role }) {
  const [sending, setSending] = useState(false)
  const [showError, setShowError] = useState(false)
  const { signIn } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    setSending(true)

    await signIn(data)
  }

  return (
    <>
      {!sending && showError && (
        <FormMessage status="error">E-mail ou senha inválido.</FormMessage>
      )}

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
