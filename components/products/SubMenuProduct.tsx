import { useRef, useEffect } from 'react'
import xw from 'xwind'
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
          subItems={'typologies'}
          path="tipologias"
          plus
        />
        <MenuItem
          name="materiais"
          subItems={'materials'}
          path="materiais"
          plus
        />
        <MenuItem
          name="designers"
          subItems={'designers'}
          path="designers"
          plus
        />
        <MenuItem
          name="linhas"
          subItems={'families'}
          path="linhas"
          plus
          lines
        />
        <MenuItem name="busca">
          <input
            ref={searchRef}
            type="search"
            css={[
              { lineHeight: '19px' },
              xw`border border-gray-500 ml-2 outline-none px-1.5 -mt-2`,
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
