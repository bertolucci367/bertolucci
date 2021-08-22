import { useState } from 'react'
import { useRouter } from 'next/router'
import ActiveLink from './Link'
import SubMenu from './SubMenu'
import { useAppContext } from '~/components/context/AppContext'

const menu = [
  { name: 'Produtos', url: '/produtos', hasSubmenu: true },
  { name: 'Designers', url: '/designers', hasSubmenu: false },
  { name: 'A Fábrica', url: '/fabrica', hasSubmenu: true },
  { name: 'Giornale', url: '/giornale', hasSubmenu: false },
  { name: 'Persona', url: '/persona', hasSubmenu: false },
  { name: 'Contato', url: '/contato', hasSubmenu: false },
]

const Desktop = () => {
  const router = useRouter()
  return (
    <>
      <nav className={`text-18px leading-none mr-8 lg:mr-0`}>
        <ul className={`lg:flex lg:justify-center`}>
          {menu.map((m, i) => (
            <li key={i}>
              <ActiveLink
                href={m.url}
                activeClassName="border-b border-solid border-black"
              >
                <a className="block font-bold mx-4px pb-1 mb-1 hover:cursor-pointer hover:no-underline">
                  {m.name}
                </a>
              </ActiveLink>
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
      <nav className={`text-18px`}>
        <ul className={`lg:flex lg:justify-around`}>
          {menu.map((m, i) => (
            <li key={i}>
              <a
                data-label="menu link"
                className={`block font-bold mx-4 pb-1 my-10 lg:my-3 hover:cursor-pointer border-b border-solid`}
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
        data-label="Menu Mobile"
        style={{ display: `${isOpenMenu ? 'flex' : 'none'}` }}
        className={`lg:hidden
          fixed top-0 bottom-0 left-0 right-0 m-auto lg:mt-3
          overflow-y-scroll
          flex-nowrap items-center
          p-5 lg:p-0
          bg-white border border-solid border-black lg:border-0
          w-11/12 lg:w-full h-2/3 lg:h-auto`}
      >
        <Mobile />
      </div>
      <div data-label="Menu Desktop" className={`hidden lg:block`}>
        <Desktop />
      </div>
    </>
  )
}
export default Menu
