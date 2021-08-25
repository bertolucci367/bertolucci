import Image from 'next/image'

const ContactInfo = ({ className }) => {
  const contact = [
    <a href="tel:11 3874 2879">11 3874 2879</a>,
    <a href="tel:11 9 4521 9938">11 9 4521 9938</a>,
    'rua espártaco, 367 - lapa',
  ]

  return (
    <div className={`flex justify-end ${className}`}>
      <div className="flex flex-wrap pb-6 justify-end text-right relative lg:flex-nowrap lg:pb-0">
        <div className="py-2 lg:flex lg:-mr-10 ">
          <a
            href="https://br.pinterest.com/bertolucci1956/"
            className="icon inline-block"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/pinterest.svg"
              layout="fixed"
              height="18"
              width="18"
              alt="instagram icon"
            />
          </a>
          <a
            href="https://instagram.com/bertolucci.iluminacao/"
            className="instagram icon inline-block ml-6"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/instagram.svg"
              layout="fixed"
              height="18"
              width="18"
              alt="instagram icon"
            />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5511945219938"
            className="whatsapp icon ml-6 inline-block"
            target="_blank"
          >
            <Image
              src="/whatsapp.svg"
              layout="fixed"
              height="18"
              width="18"
              alt="whatsapp icon"
            />
          </a>
        </div>
        <div>
          {contact.map((value, i) => (
            <span className={`block`} key={i}>
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
