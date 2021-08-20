import Image from 'next/image'

const ContactInfo = ({ className }) => {
  const contact = [
    <a href="tel:11 3874 2879">11 3874 2879</a>,
    <a href="tel:11 9 4521 9938">11 9 4521 9938</a>,
    'rua espártaco, 367 - lapa',
  ]

  return (
    <div className={`flex justify-end ${className}`}>
      <div className="flex text-right relative">
        <div className="pt-2 -mr-12">
          <a
            href="https://instagram.com/bertolucci.iluminacao/"
            className="instagram icon ml-5"
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
            target="_blank"
          >
            <span className="whatsapp icon ml-5">
              <Image
                src="/whatsapp.svg"
                layout="fixed"
                height="18"
                width="18"
                alt="whatsapp icon"
              />
            </span>
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
