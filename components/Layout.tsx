import { useState } from 'react'
import { css } from '@emotion/react'
import xw from 'xwind'

import Menu from '../components/Menu'
import Logo from '../components/Logo'

const Layout = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(true)

  const handleClick = () => {
    setIsOpenMenu(!isOpenMenu)
    console.log(isOpenMenu)
  }

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 70px 1fr;
        grid-template-columns: 1px repeat(2, 1fr) 1px;
        grid-gap: 15px;
        grid-template-areas:
          '. l mb .'
          '. c c .';

        @media (min-width: 768px) {
          grid-template-rows: 90px 1fr;
          grid-template-columns: repeat(12, 1fr);
          grid-gap: 15px;
          grid-template-areas:
            'l . tc'
            '. c .'
            '. c .';
        }
      `}
    >
      <div css={xw`flex items-center`} style={{ gridArea: 'l' }}>
        <Logo />
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
        css={xw`fixed top-0 bottom-0 left-0 right-0
        p-8 w-11/12 h-5/6 m-auto
        bg-white border border-solid border-black`}
        style={{ display: isOpenMenu ? 'block' : 'none' }}
      >
        <Menu />
      </div>
      <div css={xw`hidden text-13px`} style={{ gridArea: 'tc' }}>
        {contact.map((value, i) => (
          <p key={i}>{value}</p>
        ))}
      </div>
      <main style={{ gridArea: 'c' }}>{children}</main>
    </div>
  )
}

const MenuButton = ({ children }) => {
  return (
    <div
      style={{ gridArea: 'mb' }}
      css={xw`flex items-center justify-end lg:hidden`}
    >
      {children}
    </div>
  )
}

const contact = ['11 3874 2879', '11 9 4521 9938', 'rua espártaco, 367 - lapa']

export default Layout
