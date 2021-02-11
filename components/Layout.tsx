import { useState } from 'react'
import { css } from '@emotion/react'
import xw from 'xwind'

import Menu from '~/components/Menu'
import MenuButton from '~/components/MenuButton'
import { Logo, LogoFooter } from '~/components/Logo'

interface LayoutProps {
  subMenu?: any
  children?: React.ReactNode
}

const Layout = ({ children, subMenu }: LayoutProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleClick = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 70px 1fr;
        grid-template-columns: repeat(2, 1fr);

        @media (orientation: landscape) {
          grid-template-rows: 40px 1fr;
        }

        @media (min-width: 1024px) {
          grid-template-rows: 90px auto;
          grid-template-columns: 210px 1fr 210px;
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
            xw`fixed top-0 bottom-0 left-0 right-0 flex-wrap lg:relative lg:flex
              justify-between items-start lg:justify-center
              p-8 w-11/12 lg:w-full m-auto bg-white
              border border-solid border-black lg:border-0
              col-start-2`,
          ]}
        >
          <Menu />
          {subMenu}
        </div>

        <MenuButton>
          <button onClick={handleClick} css={xw`flex items-center px-4 py-3`}>
            <svg
              css={xw`h-8`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </MenuButton>
        <div
          css={xw`hidden text-13px lg:flex flex-col justify-center items-end pr-4 col-start-3`}
        >
          {contact.map((value, i) => (
            <p key={i}>{value}</p>
          ))}
        </div>
      </div>

      {children}

      <div
        css={[
          { width: '210px' },
          xw`hidden fixed bottom-0 left-0 pb-10 z-50 lg:flex justify-center`,
        ]}
      >
        <LogoFooter />
      </div>
    </div>
  )
}

const contact = ['11 3874 2879', '11 9 4521 9938', 'rua espártaco, 367 - lapa']

export default Layout
