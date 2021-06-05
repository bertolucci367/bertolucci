import { css } from '@emotion/react'
import xw from 'xwind'
import Image from 'next/image'

import Menu from '~/components/Menu'
import MenuButton from '~/components/MenuButton'
import { Logo, LogoFooter } from '~/components/Logo'
import { useAppContext } from '~/components/context/AppContext'
import CookieBanner from '~/components/CookieBanner'
import Head from 'next/head'
import { useEffect } from 'react'

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
    <div
      css={css`
        display: grid;
        grid-template-rows: 70px 1fr;
        grid-template-columns: 12px repeat(1, 1fr) 12px;

        @media (orientation: landscape) {
          grid-template-rows: 40px 1fr;
        }

        @media (min-width: 1024px) {
          grid-template-rows: 90px minmax(calc(100vh - 90px), 1fr);
          grid-template-columns: 220px 1fr 220px;
        }
      `}
    >
      <Head>
        <title>{[title, 'bertolucci'].filter(Boolean).join(' | ')}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <div
        css={[
          `
            @media (min-width: 1024px) {
              grid-template-columns: 210px 1fr 210px;
            }
      `,
          xw`col-start-1 col-end-4 bg-white sticky top-0 grid z-50`,
        ]}
      >
        <div
          css={xw`
            sticky top-0
            flex items-center lg:justify-center lg:items-start
            px-5 lg:px-4 lg:pt-3
            col-start-1 row-start-1`}
        >
          <Logo />
        </div>

        <div
          css={xw`
          col-start-2 lg:pt-3
        `}
        >
          <Menu isOpenMenu={shared.menuMobileIsOpen} />
        </div>

        <MenuButton>
          <button onClick={handleClick} css={xw`flex items-center px-4 py-3`}>
            {!shared.menuMobileIsOpen && (
              <svg
                css={xw`h-8`}
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
          css={xw`hidden text-13px lg:flex flex-col lg:mt-5 items-end pr-4 col-start-3`}
        >
          <div css={xw`text-right relative w-full`}>
            <div css={xw`lg:flex absolute left-0 top-2`}>
              <a
                href="https://instagram.com/bertolucci.iluminacao/"
                className="instagram icon"
                target="_blank"
                rel="noopener"
                css={xw`ml-5`}
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
                <span css={xw`ml-5`} className="whatsapp icon">
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
              <span css={xw`block`} key={i}>
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {children}

      <div
        css={[
          { width: '210px' },
          xw`hidden fixed bottom-0 left-0 pb-10 z-0 lg:flex justify-center pointer-events-none`,
        ]}
      >
        <LogoFooter />
      </div>

      {showCookie && <CookieBanner />}
    </div>
  )
}

export default Layout
