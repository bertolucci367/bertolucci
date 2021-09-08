import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/client'
import axios from 'axios'
import FormMessage from '~/components/FormMessage'
import { useState } from 'react'

const FormNewPassword = () => {
  const [session, status] = useSession()
  const [msgStatus, setMsgStatus] = useState(0)
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    setSending(true)
    const { password, confirm } = data

    if (password !== confirm) {
      setError('confirm', {
        type: 'manual',
        message: 'a nova senha e a de confirmação devem ser iguais.',
      })
      return
    }

    try {
      const res = await axios.post('/api/customer/new-password', {
        id: session.user_id,
        email: session.user.email,
        ...data,
      })

      await axios.post('/api/customer/publish', { id: session.user_id })

      setMsgStatus(200)
      reset()
    } catch (err) {
      setError('current', {
        type: 'manual',
        message: 'senha atual não confere com a senha cadastrada.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {!sending && msgStatus === 200 && (
        <FormMessage status="success">senha alterada com sucesso!</FormMessage>
      )}
      <div>
        <label htmlFor="current">senha atual</label>
        <input
          id="current"
          placeholder="senha atual"
          aria-invalid={errors.current ? 'true' : 'false'}
          {...register('current', { required: true })}
        />
        {errors.current && (
          <p className="text-help error">{errors.current.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">nova senha</label>
        <input
          id="password"
          placeholder="nova senha"
          aria-invalid={errors.password ? 'true' : 'false'}
          {...register('password', { required: true })}
        />
      </div>

      <div>
        <label htmlFor="confirm">confirme a nova senha</label>
        <input
          id="confirm"
          placeholder="confirme a nova senha"
          aria-invalid={errors.confirm ? 'true' : 'false'}
          {...register('confirm', { required: true })}
        />
        {errors.confirm && (
          <p className="text-help error">{errors.confirm.message}</p>
        )}

        <input
          type="submit"
          value={sending ? 'enviando...' : 'salvar senha'}
          className="btn mt-10"
          disabled={sending}
        />
      </div>
    </form>
  )
}

export default FormNewPassword
