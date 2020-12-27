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
        grid-template-rows: 75px 1fr;
        grid-template-columns: repeat(2, 1fr);

        @media (min-width: 1024px) {
          grid-template-rows: 90px auto;
          grid-template-columns: 210px 1fr 210px;
        }
      `}
    >
      <div
        css={xw`
        sticky top-0
        flex items-center lg:justify-center
        pl-6 lg:px-4
        col-start-1 row-start-1`}
      >
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
        css={[
          `display: ${isOpenMenu ? 'flex' : 'none'}`,
          xw`fixed top-0 bottom-0 left-0 right-0 lg:relative lg:flex
        justify-between items-center lg:justify-center
        p-8 w-11/12 h-3/4 m-auto z-50 bg-white
        border border-solid border-black lg:border-0
        col-start-2`,
        ]}
      >
        <Menu />
      </div>
      <div
        css={xw`hidden text-13px lg:flex flex-col justify-center items-end pr-4 col-start-3`}
      >
        {contact.map((value, i) => (
          <p key={i}>{value}</p>
        ))}
      </div>
      {children}
    </div>
  )
}

const MenuButton = ({ children }) => {
  return (
    <div css={xw`pr-6 flex items-center justify-end lg:hidden col-start-3`}>
      {children}
    </div>
  )
}

const contact = ['11 3874 2879', '11 9 4521 9938', 'rua espártaco, 367 - lapa']

export default Layout
