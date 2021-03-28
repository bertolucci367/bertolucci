import { useRef, useEffect } from 'react'
import xw from 'xwind'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'
import { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'

import { MenuItem } from '~/components/products/MenuItem'

interface SubMenuProductProps {
  search?: string
}

const SubMenuProduct = ({ search = '' }: SubMenuProductProps) => {
  const searchRef = useRef(null)
  const shared = useAppContext()
  const router = useRouter()
  const { data, error } = useSWR(`/api/sub-menus`, fetcher)

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
    <nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ul css={xw`lg:flex lg:flex-row lg:justify-center`}>
        {data && (
          <>
            <MenuItem name="todos" path="/produtos" isLink isAll />
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
              name="designers"
              path="/designers"
              items={data.designers}
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

        <MenuItem name="busca">
          <input
            ref={searchRef}
            type="search"
            css={[
              { lineHeight: '19px' },
              xw`border border-gray-500 ml-2 outline-none py-1.5 px-2 -mt-2 inline-block w-auto`,
            ]}
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
        </MenuItem>
        <MenuItem name="baixar o catálogo" />
      </ul>
    </nav>
  )
}

export default SubMenuProduct
