import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import xw from 'xwind'
import Layout from './Layout'
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

  useEffect(() => {
    searchRef.current.value = search
  }, [])

  return (
    <nav css={xw`flex lg:w-full lg:justify-center`}>
      <ul css={xw`lg:flex lg:flex-row lg:justify-center lg:justify-evenly`}>
        <MenuItem name="tipologia+" subItems={typologies} path="tipologias" />
        <MenuItem name="materiais+" subItems={materials} path="materiais" />
        <MenuItem name="designers+" subItems={designers} path="designers" />
        <MenuItem name="linhas+" subItems={families} path="linhas" />
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
