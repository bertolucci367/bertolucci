import xw from 'xwind'
import { useForm } from 'react-hook-form'
import Layout from '~/components/Layout'
import ContactForm from '~/components/ContactForm'

function Contact({}) {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = data => {
    console.log(data)
  }
  return (
    <Layout>
      <div
        css={xw`col-start-2 col-end-3 grid gap-16 grid-cols-1 2xl:grid-cols-3`}
      >
        <div css={xw`2xl:col-span-2`}>
          <h1 css={xw`text-center font-medium mb-4 px-4 text-18px`}>
            loja e showroom
          </h1>
          <iframe
            css={xw`w-full h-4/5`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14632.232686126328!2d-46.70308301932547!3d-23.53041007072133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8712291c14b%3A0x3337a97010127069!2sR.+Esp%C3%A1rtaco%2C+367+-+Vila+Romana%2C+S%C3%A3o+Paulo+-+SP!5e0!3m2!1sen!2sbr!4v1472000172558"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={false}
          ></iframe>
        </div>
        <div css={xw`md:w-2/3 pb-20`}>
          <h2 css={xw`mb-4 text-18px`}>entre em contato</h2>
          <p css={xw`mb-20`}>
            lorem ipsum dolor sit amet consectetur adipisicing elit. Natus illo
            expedita tempora placeat doloremque vitae inventore explicabo?
          </p>
          <ContactForm />
        </div>
      </div>
    </Layout>
  )
}

export default Contact
