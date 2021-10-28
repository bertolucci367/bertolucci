import { useForm } from 'react-hook-form'
import { useState } from 'react'
import FormMessage from '~/components/FormMessage'

interface IFormInput {
  name: String
  nickname: string
  email: string
  ddd: string
  phone: string
  city: string
  state: string
  message: string
}

const ContactForm = () => {
  const [sending, setSending] = useState(false)
  const [msgStatus, setMsgStatus] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: IFormInput) => {
    setSending(true)
    setMsgStatus(0)
    const res = await fetch('/api/send-contact-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setSending(false)
    setMsgStatus(res.status)

    if (res.status == 200) {
      reset()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {msgStatus === 200 && (
          <FormMessage status="success">
            mensagem enviada com sucesso!
          </FormMessage>
        )}
        {msgStatus === 404 && (
          <FormMessage status="error">
            ops... tente mais tarde ou entre em contato por telefone.
          </FormMessage>
        )}

        <label htmlFor="name">*nome</label>
        <input
          id="name"
          placeholder="nome completo"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', { required: true })}
        />
        {errors.name && errors.name.type === 'required' && (
          <FormMessage status="error.field">{errors.name.message}</FormMessage>
        )}
        <input type="text" className={`hidden`} />
        <label htmlFor="email">*e-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="seu e-mail para entrarmos em contato"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <FormMessage status="error.field">{errors.email.message}</FormMessage>
        )}

        <div className="md:flex">
          <div>
            <label htmlFor="ddd">*código (DDD)</label>
            <input
              type="tel"
              name="ddd"
              id="ddd"
              placeholder="DDD"
              maxLength={3}
              {...register('ddd', { required: true })}
            />
          </div>

          <div className="w-full md:ml-4">
            <label htmlFor="phone">*telefone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="telefone"
              {...register('phone', { required: true })}
            />
            {errors.phone && (
              <FormMessage status="error.field">
                {errors.phone.message}
              </FormMessage>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="city">*cidade</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="cidade"
            aria-invalid={errors.city ? 'true' : 'false'}
            {...register('city', { required: true })}
          />
          {errors.city && (
            <FormMessage status="error.field">
              {errors.city.message}
            </FormMessage>
          )}
        </div>

        <div>
          <label htmlFor="state">*estado</label>
          <input
            type="text"
            name="state"
            id="state"
            placeholder=""
            aria-invalid={errors.state ? 'true' : 'false'}
            {...register('state', { required: true })}
            className="uppercase"
          />
          {errors.state && (
            <FormMessage status="error.field">
              {errors.state.message}
            </FormMessage>
          )}
        </div>

        <div>
          <label htmlFor="message">*mensagem</label>
          <textarea
            name="message"
            id="message"
            rows={10}
            {...register('message', { required: true })}
          ></textarea>
          {errors.message && (
            <FormMessage status="error.field">
              {errors.message.message}
            </FormMessage>
          )}
        </div>

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
