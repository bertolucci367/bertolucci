import { useRef, useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'
import { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'

import { MenuItem } from '~/components/products/MenuItem'
import style from './SubMenuProduct.module.css'

interface SubMenuProductProps {
  search?: string
}

interface DataProps {
  typologies: []
  materials: []
  designers: []
  lines: []
}

const SubMenuProduct = ({ search = '' }: SubMenuProductProps) => {
  const searchRef = useRef(null)
  const shared = useAppContext()
  const router = useRouter()
  const { data, error } = useSWR<DataProps>(`/api/sub-menus`, fetcher)

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
    if (!searchRef.current) return
    searchRef.current.value = search
  }, [])

  return (
    <nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ul className={`lg:flex lg:flex-row lg:justify-center ${style.onHover}`}>
        {data && (
          <>
            <MenuItem name="todos" path="/produtos" isAll />
            <MenuItem
              name="tipologia"
              path="/produtos/tipologias"
              items={data.typologies}
              plus
            />
            <MenuItem
              name="materiais"
              path="/produtos/materiais"
              items={data.materials}
              plus
            />
            <MenuItem
              name="linhas"
              path="/produtos/linhas"
              plus
              items={data.lines}
            />
          </>
        )}

        <MenuItem name="">
          <div
            className={`flex flex-wrap lg:flex-nowrap text-12px items-start`}
          >
            <label className={`mt-4px`} htmlFor="search">
              busca
            </label>
            <input
              ref={searchRef}
              type="search"
              style={{ lineHeight: '19px' }}
              className={`border border-gray-500 ml-2 outline-none mt-1 py-0.5 px-2 inline-block w-auto`}
              onKeyPress={event => {
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
          </div>
        </MenuItem>
      </ul>
    </nav>
  )
}

export default SubMenuProduct
