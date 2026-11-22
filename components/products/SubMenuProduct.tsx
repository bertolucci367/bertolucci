import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'
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
  const shared = useAppContext()
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
          </>
        )}
      </ul>
    </nav>
  )
}

export default SubMenuProduct
