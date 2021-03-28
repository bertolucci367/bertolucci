import xw from 'xwind'

interface IFormInput {
  name: String
  nickname: string
  email: string
  phone: string
  message: string
}

const ContactForm = () => {
  return (
    <>
      <form>
        <label htmlFor="name">*nome</label>
        <input type="text" id="name" placeholder="nome completo" />
        <input type="text" css={xw`hidden`} />
        <label htmlFor="email">*e-mail</label>
        <input type="email" name="email" id="email" placeholder="" />
        <label htmlFor="phone">telefone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="telefone com DDD"
        />
        <label htmlFor="message">mensagem</label>
        <textarea name="message" id="message" rows={10}></textarea>
        <input type="submit" value="enviar" />
      </form>
    </>
  )
}

export default ContactForm
