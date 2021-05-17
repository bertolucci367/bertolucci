import { useState, useEffect } from 'react'
import xw from 'xwind'
import { useRouter } from 'next/router'
import Link from './Link'
import SubMenu from './SubMenu'
import { useAppContext } from '~/components/context/AppContext'

const menu = [
  { name: 'Produtos', url: '/produtos', hasSubmenu: true },
  { name: 'Designers', url: '/designers', hasSubmenu: false },
  // { name: 'Ambientes', url: '/ambientes', hasSubmenu: false },
  { name: 'A Fábrica', url: '/fabrica', hasSubmenu: true },
  // { name: 'Imprensa', url: '/imprensa', hasSubmenu: false },
  { name: 'Giornale', url: '/giornale', hasSubmenu: false },
  { name: 'Contato', url: '/contato', hasSubmenu: false },
]

const Desktop = () => {
  const router = useRouter()
  return (
    <>
      <nav css={xw`text-18px leading-none mr-8 lg:mr-0`}>
        <ul css={xw`lg:flex lg:justify-center`}>
          {menu.map((m, i) => (
            <li key={i}>
              <Link href={m.url}>
                <a
                  css={xw`block font-bold mx-4 pt-4 pb-1 mb-1 hover:cursor-pointer`}
                >
                  {m.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SubMenu active={router.asPath} />
    </>
  )
}

const Mobile = () => {
  const router = useRouter()
  const [current, setCurrent] = useState(router.asPath)
  const shared = useAppContext()

  const handleClick = (e, menu) => {
    if (!menu.hasSubmenu) {
      router.push(menu.url)
      shared.addData({ menuMobileIsOpen: false })
    }

    e.preventDefault()
    e.stopPropagation()

    setCurrent(menu.url)
  }

  return (
    <>
      <nav css={xw`text-18px`}>
        <ul css={xw`lg:flex lg:justify-around`}>
          {menu.map((m, i) => (
            <li key={i}>
              <a
                css={xw`block font-bold mx-4 pb-1 my-10 lg:my-3 hover:cursor-pointer border-b border-solid`}
                style={{
                  borderBottomColor: m.url === current ? 'black' : 'white',
                }}
                onClick={e => handleClick(e, m)}
              >
                {m.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <SubMenu active={current} />
    </>
  )
}

const Menu = ({ isOpenMenu }) => {
  return (
    <>
      <div
        css={[
          `display: ${isOpenMenu ? 'flex' : 'none'}`,
          xw`lg:hidden
          fixed top-0 bottom-0 left-0 right-0 m-auto lg:mt-3
          overflow-y-scroll
          flex-nowrap items-center
          p-5 lg:p-0
          bg-white border border-solid border-black lg:border-0
          w-11/12 lg:w-full h-2/3 lg:h-auto`,
        ]}
      >
        <Mobile />
      </div>
      <div css={xw`hidden lg:block`}>
        <Desktop />
      </div>
    </>
  )
}
export default Menu
