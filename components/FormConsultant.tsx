import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SubmitButton from './SubmitButton'
import FormMessage from '~/components/FormMessage'

export default function FormConsultant({ consultant, user }) {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async dataForm => {
    setSending(true)

    try {
      const res = await axios.post('/api/send-email', {
        to: consultant.email,
        subject: `Mensagem de ${user.name}`,
        message: `
          <b>Nome:</b> ${user.name}<br/>
          <b>E-mail:</b> ${user.email}<br/>

          <b>Mensagem:</b><br/>
          ${dataForm.message}
        `,
      })

      reset()
      setStatus(res.status)
    } finally {
      setSending(false)
    }
  }

  if (!consultant) {
    return <></>
  }

  return (
    <>
      {!sending && status == 200 && (
        <FormMessage status="success">
          Mensagem enviada com sucesso!
          <span className="font-medium block">
            Entraremos em contato em breve.
          </span>
        </FormMessage>
      )}

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="to">para</label>
          <input
            type="email"
            name="to"
            id="to"
            value={consultant.email}
            disabled
          />
        </div>
        <div>
          <label htmlFor="message">mensagem:</label>
          <textarea
            name="message"
            id="message"
            placeholder="digite sua mensagem"
            rows={10}
            aria-invalid={errors.company ? 'true' : 'false'}
            {...register('message', { required: true })}
          ></textarea>
        </div>
        <div>
          <SubmitButton btnLabel="enviar" sending={sending} />
        </div>
      </form>
    </>
  )
}
