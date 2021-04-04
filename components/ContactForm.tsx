import xw from 'xwind'
import { useForm } from 'react-hook-form'

interface IFormInput {
  name: String
  nickname: string
  email: string
  phone: string
  message: string
}

const ContactForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: IFormInput) => {
    fetch('/api/send-contact-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">*nome</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="nome completo"
          ref={register}
        />
        <input type="text" css={xw`hidden`} ref={register} />
        <label htmlFor="email">*e-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder=""
          ref={register}
        />
        <label htmlFor="phone">telefone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="telefone com DDD"
          ref={register}
        />
        <label htmlFor="message">mensagem</label>
        <textarea
          name="message"
          id="message"
          rows={10}
          ref={register}
        ></textarea>
        <input type="submit" value="enviar" />
      </form>
    </>
  )
}

export default ContactForm
