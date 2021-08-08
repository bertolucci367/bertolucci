import Image from 'next/image'
import Menu from '~/components/Menu'
import MenuButton from '~/components/MenuButton'
import { Logo, LogoFooter } from '~/components/Logo'
import { useAppContext } from '~/components/context/AppContext'
import CookieBanner from '~/components/CookieBanner'
import Head from 'next/head'

interface LayoutProps {
  children?: React.ReactNode
  title?: string
  description?: string
  showCookie?: boolean
}

const Layout = ({
  children,
  title = '',
  description = 'bertolucci - Dedicada ao Brasil desde 1956',
  showCookie = true,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{[title, 'bertolucci'].filter(Boolean).join(' | ')}</title>
        <meta name="description" content={description}></meta>
      </Head>

      <div
        className="h-full min-h-screen
                   grid grid-areas-slim lg:grid-areas-wide lg:grid-cols-wide
                   grid-rows-slim lg:grid-rows-slim-wide"
      >
        <Header />

        {children}

        <Footer />

        {showCookie && <CookieBanner />}
      </div>
    </>
  )
}

const Header = () => {
  const shared = useAppContext()

  const handleClick = () => {
    shared.addData({ menuMobileIsOpen: !shared.menuMobileIsOpen })
  }

  const wrapStyle =
    'flex items-center lg:justify-center lg:items-start lg:pt-[18px]'
  const stickStyle = 'sticky top-0 z-50 bg-white'

  return (
    <>
      <div
        className={`grid-in-h1 pl-6 ${wrapStyle} flex-start ${stickStyle} lg:p-0`}
      >
        <Logo />
      </div>

      <div
        className={`grid-in-h3 pr-4 lg:hidden ${wrapStyle} justify-end ${stickStyle}`}
        data-label="menu button"
      >
        <MenuButton>
          <button
            onClick={handleClick}
            className={`flex items-center px-4 py-3`}
          >
            {!shared.menuMobileIsOpen && (
              <svg
                className={`h-8`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            )}

            {shared.menuMobileIsOpen && (
              <Image
                src="/close.svg"
                layout="fixed"
                height="16"
                width="16"
                alt="close icon"
              />
            )}
          </button>
        </MenuButton>
      </div>

      <ContactInfo
        className={`grid-in-f2 pr-6 lg:grid-in-h3 lg:pt-[18px] ${stickStyle}`}
      />

      <header
        className={`grid-in-h2 lg:pt-[18px]  justify-center ${stickStyle}`}
      >
        <Menu isOpenMenu={shared.menuMobileIsOpen} />
      </header>
    </>
  )
}

const Footer = () => {
  return (
    <>
      <div className="hidden grid-in-f1 block pl-6 pb-8">
        <LogoFooter />
      </div>
      <div className=" lg:block z-50 pl-6 pb-4 grid-in-f1 lg:grid-in-f3 lg:text-right">
        <a className="block" href="/newsletter">
          Newsletter
        </a>
        <a className="block" href="">
          Tire suas dúvidas
        </a>
        <a className="block" href="">
          Política de privacidade
        </a>
      </div>
    </>
  )
}

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

export default Layout
