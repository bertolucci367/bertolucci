import xw from 'xwind'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import FormMessage from '~/components/FormMessage'

interface IFormInput {
  name: String
  nickname: string
  email: string
  phone: string
  message: string
}

const ContactForm = () => {
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: IFormInput) => {
    setSending(true)
    setSuccess(false)
    const res = await fetch('/api/send-contact-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setSending(false)

    if (res.ok) {
      setSuccess(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {success && (
          <FormMessage status="success">enviado com sucesso!</FormMessage>
        )}

        <label htmlFor="name">*nome</label>
        <input
          id="name"
          placeholder="nome completo"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', { required: true })}
        />
        {errors.name && errors.name.type === 'required' && (
          <FormMessage status="error">{errors.name.message}</FormMessage>
        )}
        <input type="text" css={xw`hidden`} />
        <label htmlFor="email">*e-mail</label>
        <input type="email" name="email" id="email" placeholder="" />
        {errors.email && (
          <FormMessage status="error">{errors.email.message}</FormMessage>
        )}
        <label htmlFor="phone">telefone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="telefone com DDD"
        />
        <label htmlFor="message">mensagem</label>
        <textarea name="message" id="message" rows={10}></textarea>

        <input
          type="submit"
          value={sending ? 'enviando...' : 'enviar'}
          disabled={sending}
        />
      </form>
    </>
  )
}

export default ContactForm
