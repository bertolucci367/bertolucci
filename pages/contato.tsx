import Layout from '~/components/Layout'
import Image from 'next/image'
import ContactForm from '~/components/ContactForm'

function Contact({}) {
  return (
    <Layout title="contato">
      <div className={`grid-in-main grid gap-16 grid-cols-1 2xl:grid-cols-3`}>
        <div
          className={`col-span-3 col-start-1 row-start-2 2xl:min-h-screen pb-20 2xl:pb-0`}
        >
          <h1 className={`text-center font-medium mb-4 px-4 text-18px`}>
            loja e showroom
          </h1>
          <iframe
            className={`w-full h-map 2xl:h-4/5`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14632.232686126328!2d-46.70308301932547!3d-23.53041007072133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8712291c14b%3A0x3337a97010127069!2sR.+Esp%C3%A1rtaco%2C+367+-+Vila+Romana%2C+S%C3%A3o+Paulo+-+SP!5e0!3m2!1sen!2sbr!4v1472000172558"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen={false}
          ></iframe>
        </div>
        <div
          className={`col-start-1 col-end-4 grid gap-x-32 grid-cols-1 2xl:grid-cols-3`}
        >
          <div className="pb-20">
            <h2 className="mt-0 text-h1">Você quer mais informações?</h2>
            <p className={`mb-20`}>
              Caso não tenha encontrado as informações necessárias, não hesite
              em nos contactar preenchendo o formulário abaixo ou através das
              nossas redes sociais. Há muitas coisas a descobrir, conheça mais
              do mundo Bertolucci.
            </p>
            <ContactForm />
          </div>

          <div className="pb-20">
            <p>
              É profissional? Ficaremos felizes em achar uma solução
              personalizada ao seu projeto. Agende uma visita
            </p>
          </div>

          <div className="pb-20">
            <h2 className="mt-0 text-h1">Atendimento por whatsapp</h2>
            <a
              href="https://api.whatsapp.com/send?phone=5511945219938"
              target="_blank"
              className="flex items-center"
            >
              55 11 9 4521 9938
              <div className="whatsapp icon ml-5">
                <Image
                  src="/whatsapp.svg"
                  layout="fixed"
                  height="18"
                  width="18"
                  alt="whatsapp icon"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
