import { useState, useEffect } from 'react'
import xw from 'xwind'
import { useRouter } from 'next/router'
import Link from './Link'
import SubMenu from './SubMenu'

const menu = [
  { name: 'Produtos', url: '/produtos', hasSubmenu: true },
  { name: 'Designers', url: '/designers', hasSubmenu: false },
  // { name: 'Ambientes', url: '/ambientes', hasSubmenu: false },
  // { name: 'Sobre', url: '/sobre', hasSubmenu: true },
  // { name: 'Imprensa', url: '/imprensa', hasSubmenu: false },
  // { name: 'Blog', url: '/noticias', hasSubmenu: false },
  { name: 'Contato', url: '/contato', hasSubmenu: false },
]

const Desktop = () => {
  const router = useRouter()
  return (
    <>
      <nav css={xw`text-18px leading-none mr-8 lg:mr-0`}>
        <ul css={xw`lg:flex lg:justify-around`}>
          {menu.map((m, i) => (
            <li key={i}>
              <Link href={m.url}>
                <a
                  css={xw`block font-bold mx-4 pb-1 my-10 lg:my-3 hover:cursor-pointer`}
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

  const handleClick = (e, menu) => {
    if (!menu.hasSubmenu) {
      router.push(menu.url)
    }

    setCurrent(menu.url)
  }

  return (
    <>
      <nav css={xw`text-18px leading-none mr-8 lg:mr-0`}>
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

const Menu = () => {
  const [activePath, setActivePath] = useState('')
  const [bodyWidth, setBodyWidth] = useState(0)

  useEffect(() => {
    function handleResize() {
      const { width } = document.body.getBoundingClientRect()
      setBodyWidth(width)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (bodyWidth < 1024) {
    return <Mobile />
  }

  return <Desktop />
}
export default Menu
