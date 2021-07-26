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

const contact = ['11 3874 2879', '11 9 4521 9938', 'rua espártaco, 367 - lapa']

const Layout = ({
  children,
  title = '',
  description = 'bertolucci - Dedicada ao Brasil desde 1956',
  showCookie = true,
}: LayoutProps) => {
  const shared = useAppContext()

  const handleClick = () => {
    shared.addData({ menuMobileIsOpen: !shared.menuMobileIsOpen })
  }

  return (
    <div className="grid grid-rows-layout grid-cols-layout lg:grid-rows-layout-lg lg:grid-cols-layout-lg">
      <Head>
        <title>{[title, 'bertolucci'].filter(Boolean).join(' | ')}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <header
        className={`grid-cols-layout lg:grid-cols-layout-lg col-start-1 col-end-4 bg-white sticky top-0 grid z-50`}
      >
        <div
          className={`
            sticky top-0
            flex items-center lg:justify-center lg:items-start
            px-5 lg:px-4 lg:pt-3
            col-start-1 row-start-1`}
        >
          <Logo />
        </div>

        <div className={`col-start-2 lg:pt-3`}>
          <Menu isOpenMenu={shared.menuMobileIsOpen} />
        </div>

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

        <div
          className={`hidden text-13px lg:flex flex-col lg:mt-5 items-end pr-4 col-start-3`}
        >
          <div className={`text-right relative w-full`}>
            <div className={`lg:flex absolute left-0 top-2`}>
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
            {contact.map((value, i) => (
              <span className={`block`} key={i}>
                {value}
              </span>
            ))}
          </div>
        </div>
      </header>

      {children}

      <div
        className="hidden fixed bottom-0 left-0 pb-10 z-0 lg:flex justify-center pointer-events-none"
        style={{ width: '210px' }}
      >
        <LogoFooter />
      </div>

      {showCookie && <CookieBanner />}
    </div>
  )
}

export default Layout
