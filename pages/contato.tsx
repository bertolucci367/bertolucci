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
          className="col-start-1 col-end-4 pb-20 2xl:pb-28"
        >
          <div className="flex flex-col gap-8 px-6 text-18px 2xl:px-20 2xl:text-2xl">
            <a
              href="https://api.whatsapp.com/send?phone=5511945219938"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Image
                  src="/whatsapp.svg"
                  layout="fixed"
                  height="28"
                  width="28"
                  alt="whatsapp icon"
                />
              </div>
              (11) 94521-9938
            </a>

            <a
              href="mailto:bertolucci@bertolucci.com.br"
              className="flex items-center gap-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Image
                  src="/email.svg"
                  layout="fixed"
                  height="26"
                  width="26"
                  alt="email icon"
                />
              </div>
              bertolucci@bertolucci.com.br
            </a>

            <a
              href="https://www.instagram.com/bertolucci.oficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Image
                  src="/instagram.svg"
                  layout="fixed"
                  height="28"
                  width="28"
                  alt="instagram icon"
                />
              </div>
              @bertolucci.oficial
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Esp%C3%A1rtaco+367+Lapa+S%C3%A3o+Paulo+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5"
            >
              <svg
                className="h-8 w-8 shrink-0"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 3C10.477 3 6 7.477 6 13c0 7.5 10 16 10 16s10-8.5 10-16c0-5.523-4.477-10-10-10Zm0 13.5A3.5 3.5 0 1 1 16 9a3.5 3.5 0 0 1 0 7.5Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M10 27.5c1.8-1.1 3.8-1.6 6-1.6s4.2.5 6 1.6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              Rua Espártaco, 367, Lapa - São Paulo - SP
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
