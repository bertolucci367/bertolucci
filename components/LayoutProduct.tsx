import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import xw from 'xwind'
import Layout from './Layout'
import { useAppContext } from '~/components/context/AppContext'
import CompareList from '~/components/products/CompareList'
import {
  MenuItem,
  typologies,
  materials,
  designers,
  families,
} from '~/components/products/MenuItem'

const subMenuProducts = ({ router, search = '' }) => {
  const searchRef = useRef(null)
  const shared = useAppContext()
  let timer: ReturnType<typeof setTimeout> = null

  const shouldCloseSubMenu = () => {
    shared.addData({ menuIsOpen: false })
  }

  const handleMouseLeave = () => {
    timer = setTimeout(shouldCloseSubMenu, 2000)
  }

  const handleMouseEnter = () => {
    clearTimeout(timer)
  }

  useEffect(() => {
    searchRef.current.value = search
  }, [])

  return (
    <nav
      css={xw`flex max-h-full overflow-y-auto w-full lg:justify-center`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul css={xw`lg:flex lg:flex-row lg:justify-center`}>
        <MenuItem
          name="tipologia"
          subItems={typologies}
          path="tipologias"
          plus
        />
        <MenuItem name="materiais" subItems={materials} path="materiais" plus />
        <MenuItem name="designers" subItems={designers} path="designers" plus />
        <MenuItem name="linhas" subItems={families} path="linhas" plus lines />
        <MenuItem name="busca">
          <input
            ref={searchRef}
            type="search"
            css={[
              { lineHeight: '19px' },
              xw`border border-gray-500 ml-2 outline-none px-1.5 -mt-2`,
            ]}
            onKeyPress={(event) => {
              if (event.key !== 'Enter') {
                return
              }

              const target = event.target as HTMLTextAreaElement

              if (target.value.length > 0) {
                router.push(`/produtos/busca/${target.value}`)
                return
              }

              router.push(`/produtos`)
            }}
          />
        </MenuItem>
        <MenuItem name="baixar o catálogo" />
      </ul>
    </nav>
  )
}

interface LayoutProductProps {
  search?: string
  children?: React.ReactNode
}

const LayoutProduct = ({ children, search }: LayoutProductProps) => {
  const router = useRouter()
  const shared = useAppContext()

  useEffect(() => {
    const handleRouteChange = () => {
      shared.addData({ menuIsOpen: false })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <Layout subMenu={subMenuProducts({ router, search })}>
      <div css={[xw`col-start-1 col-end-2 row-start-2 row-end-2 h-full`]}>
        <div
          css={[
            xw`sticky text-center hidden lg:block`,
            `top: calc(50% - 45px);`,
          ]}
        >
          <CompareList />
        </div>
      </div>
      <div css={[xw`col-start-2 col-end-3 row-start-2 row-end-2`]}>
        {children}
      </div>
    </Layout>
  )
}

export default LayoutProduct
