import xw from 'xwind'
import { useForm } from 'react-hook-form'
import Layout from '~/components/Layout'

function Contact({}) {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = data => {
    console.log(data)
  }
  return (
    <Layout>
      <div css={xw`col-start-2 col-end-3`}>
        <h1 css={xw`text-center font-medium mb-4 px-4 text-13px`}>
          loja e showroom
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14632.232686126328!2d-46.70308301932547!3d-23.53041007072133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8712291c14b%3A0x3337a97010127069!2sR.+Esp%C3%A1rtaco%2C+367+-+Vila+Romana%2C+S%C3%A3o+Paulo+-+SP!5e0!3m2!1sen!2sbr!4v1472000172558"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen={false}
          css={xw`w-full h-4/5`}
        ></iframe>
        <div css={xw`w-3/12 mx-auto text-13px hidden`}>
          <h2 css={xw`my-4`}>entre em contato</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            css={xw`w-full flex flex-col`}
          >
            <label htmlFor="name">nome</label>
            <input
              type="text"
              id="name"
              name="nome"
              placeholder="nome"
              ref={register}
            />
            <label htmlFor="email">e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              ref={register({ required: true, maxLength: 10 })}
            />
            <label htmlFor="phone">telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              ref={register({ required: true, maxLength: 10 })}
            />
            <label htmlFor="message">mensagem</label>
            <textarea
              cols={10}
              id="message"
              name="message"
              placeholder="digite sua mensagem"
              ref={register({ required: true })}
            ></textarea>
            {errors.exampleRequired && <p>This field is required</p>}
            <span>
              <input type="submit" value="enviar" />
            </span>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
