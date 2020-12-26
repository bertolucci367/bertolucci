import Link from 'next/link'
import { css } from '@emotion/react'
import xw from 'xwind'

import Menu from '../components/Menu'

const Header = () => {
  return (
    <>
      <div
        css={css`
          grid-area: header;
          width: 100%;
        `}
      >
        <nav
          css={xw`flex items-center justify-between flex-wrap p-6 font-mono mt-2`}
        >
          <div css={xw`w-full block lg:items-center lg:w-auto`}>
            <Menu />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
