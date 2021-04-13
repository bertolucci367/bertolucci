import { useState } from 'react'
import { css } from '@emotion/react'
import xw from 'xwind'
import Image from 'next/image'

import Menu from '~/components/Menu'
import MenuButton from '~/components/MenuButton'
import { Logo, LogoFooter } from '~/components/Logo'

interface LayoutProps {
  children?: React.ReactNode
}

const contact = ['11 3874 2879', '11 9 4521 9938', 'rua espártaco, 367 - lapa']

const Layout = ({ children }: LayoutProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleClick = () => {
    setIsOpenMenu(!isOpenMenu)
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
            flex items-center lg:justify-center
            px-5 lg:px-4
            col-start-1 row-start-1`}
        >
          <Logo />
        </div>

        <div
          css={[
            `display: ${isOpenMenu ? 'flex' : 'none'}`,
            xw`
              fixed top-0 bottom-0 left-0 right-0 m-auto
              overflow-y-scroll
              flex-nowrap items-center
              p-5 lg:p-0
              bg-white border border-solid border-black lg:border-0
              w-11/12 lg:w-full h-2/3 lg:h-auto
              lg:overflow-y-visible
              lg:flex lg:flex-wrap lg:relative lg:justify-center
              col-start-2`,
          ]}
        >
          <Menu />
        </div>

        <MenuButton>
          <button onClick={handleClick} css={xw`flex items-center px-4 py-3`}>
            {!isOpenMenu && (
              <svg
                css={xw`h-8`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            )}

            {isOpenMenu && (
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
          css={xw`hidden text-13px lg:flex flex-col justify-center items-end pr-4 col-start-3`}
        >
          <div css={xw`text-right relative w-full`}>
            <div css={xw`lg:flex absolute left-0 top-2`}>
              <a
                href="https://www.facebook.com/iluminacao.bertolucci"
                className="facebook icon"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src="/facebook.svg"
                  layout="fixed"
                  height="18"
                  width="18"
                  alt="facebook icon"
                />
              </a>
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
              <span css={xw`ml-5`} className="whatsapp icon">
                <Image
                  src="/whatsapp.svg"
                  layout="fixed"
                  height="18"
                  width="18"
                  alt="whatsapp icon"
                />
              </span>
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
    </div>
  )
}

export default Layout
