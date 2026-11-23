import useSWR from 'swr'
import { useRouter } from 'next/router'
import fetcher from '~/components/libs/fetcher'
import { useAppContext } from '~/components/context/AppContext'

import { MenuItem } from '~/components/products/MenuItem'
import style from './SubMenuProduct.module.css'

interface SubMenuProductProps {
  search?: string
}

interface DataProps {
  typologies: { name: string; slug: string }[]
}

const SubMenuProduct = ({ search = '' }: SubMenuProductProps) => {
  const router = useRouter()
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
            {data.typologies.map(({ name, slug }) => {
              const path = `/produtos/tipologias/${slug}`

              return (
                <MenuItem
                  key={slug}
                  name={name}
                  path={path}
                  thumbSlug={slug}
                  isActive={router.asPath.split('?')[0] === path}
                />
              )
            })}
          </>
        )}
      </ul>
    </nav>
  )
}

export default SubMenuProduct
