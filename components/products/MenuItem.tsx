import Link from 'next/link'
import { useAppContext } from '~/components/context/AppContext'
import GraphImg from 'graphcms-image'
import MenuItemThumb from '~/components/products/MenuItemThumb'

import style from './MenuItem.module.css'

interface MenuItemProps {
  name?: string
  path?: string
  children?: React.ReactNode
  plus?: boolean
  items?: any
  isLink?: boolean
  isAll?: boolean
}

export const MenuItem = ({
  name,
  path,
  children,
  plus,
  items,
  isAll,
}: MenuItemProps) => {
  const shared = useAppContext()

  const handleSubLink = () => {
    shared.addData({ menuMobileIsOpen: false })
  }

  const isOpenMenu = (name: string) => {
    return shared.menuOpen === name && shared.menuIsOpen
  }

  return (
    <li className={`mx-2 my-10 lg:my-0 ${isAll ? 'lg:hidden' : ''}`}>
      {name && (
        <MenuLink
          isOpen={isOpenMenu(name)}
          name={name}
          plus={plus}
          path={path}
        />
      )}
      {items && (
        <div
          className={`bg-white lg:mt-2.5 lg:absolute lg:left-0 lg:right-0 ${
            isOpenMenu(name) ? 'lg:block' : 'lg:hidden'
          }`}
        >
          <ul
            className={`
              ${isOpenMenu(name) ? '' : 'hidden'}
              w-full bg-white
              pl-8 lg:pl-0 lg:mt-5 lg:pb-5
              flex-col
              lg:max-w-screen-lg lg:mx-auto
              lg:flex lg:flex-wrap lg:flex-row lg:justify-center

              ${
                name === 'designers'
                  ? 'justify-items-start lg:justify-start lg:max-w-screen-lg lg:mx-auto'
                  : ''
              }

              ${name === 'linhas' ? `${style.linhas}` : ''}
            `}
          >
            {items.map(({ slug, name, title, photo }) => (
              <li key={name} className="my-5 lg:my-0">
                {title && (
                  <span
                    aria-label="Sub Menu"
                    className={`text-12px lg:px-5 font-medium`}
                  >
                    {name}
                  </span>
                )}
                {!title && (
                  <Link href={`${path}/${slug}`} prefetch={false}>
                    <a
                      className="flex text-12px lg:px-5 leading-tight"
                      onClick={() => handleSubLink()}
                    >
                      {photo && photo[0] && (
                        <GraphImg
                          image={photo[0]}
                          alt={photo[0]?.alt}
                          fit="crop"
                          className={`mr-2.5 h-32px w-32px`}
                        />
                      )}
                      <MenuItemThumb slug={slug} />
                      {name}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {children}
    </li>
  )
}

const MenuLink = ({ isOpen, name, plus, path }) => {
  const shared = useAppContext()

  const handleToggle = (e: React.MouseEvent, name: string, plus) => {
    if (!plus) {
      shared.addData({ menuMobileIsOpen: false })
      return
    }

    e.preventDefault()
    const _isOpen = shared.menuOpen === name ? !shared.menuIsOpen : true
    shared.addData({ menuOpen: name, menuIsOpen: _isOpen })
  }

  const _class =
    'inline-block text-12px hover:cursor-pointer hover:font-medium lg:mt-4px'

  //
  return (
    <>
      {plus && (
        <button
          className={`${_class} ${isOpen ? 'font-medium' : ''}`}
          onClick={e => handleToggle(e, name, plus)}
        >
          {name}
          {isOpen && <span>-</span>}
          {!isOpen && <span>+</span>}
        </button>
      )}

      {!plus && (
        <a
          className={_class}
          onClick={e => handleToggle(e, name, plus)}
          href={path}
        >
          {name}
        </a>
      )}
    </>
  )
}
