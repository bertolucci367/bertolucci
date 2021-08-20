import Image from 'next/image'
import Menu from '~/components/Menu'
import MenuButton from '~/components/MenuButton'
import ContactInfo from './ContactInfo'
import { Logo } from '~/components/Logo'
import { useAppContext } from '~/components/context/AppContext'

const Header = () => {
  const shared = useAppContext()

  const handleClick = () => {
    shared.addData({ menuMobileIsOpen: !shared.menuMobileIsOpen })
  }

  const wrapStyle =
    'flex items-center lg:justify-center lg:items-start lg:pt-[18px]'
  const stickStyle = 'sticky top-0 z-50 bg-white'

  return (
    <>
      <div
        className={`grid-in-h1 ${wrapStyle} flex-start ${stickStyle} lg:p-0`}
      >
        <Logo />
      </div>

      <div
        className={`grid-in-h3 lg:hidden ${wrapStyle} justify-end ${stickStyle}`}
        data-label="menu button"
      >
        <MenuButton>
          <button
            onClick={handleClick}
            className={`flex items-center py-3 px-2`}
          >
            {!shared.menuMobileIsOpen && (
              <svg
                className={`h-8`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            )}

            {shared.menuMobileIsOpen && (
              <Image
                src="/close.svg"
                layout="fixed"
                height="16"
                width="16"
                alt="close icon"
              />
            )}
          </button>
        </MenuButton>
      </div>

      <ContactInfo
        className={`grid-in-f2 lg:grid-in-h3 lg:pt-[18px] ${stickStyle}`}
      />

      <header
        className={`grid-in-h2 lg:pt-[18px] justify-center ${stickStyle}`}
      >
        <Menu isOpenMenu={shared.menuMobileIsOpen} />
      </header>
    </>
  )
}

export default Header
