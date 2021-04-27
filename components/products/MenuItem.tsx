import { useState } from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useAppContext } from '~/components/context/AppContext'
import GraphImg from 'graphcms-image'
import MenuItemThumb from '~/components/products/MenuItemThumb'

type TypeMenuItemProps = {
  all?: boolean
}

type SubMenuProps = {
  show?: boolean
  plus?: boolean
  name?: string
}

const MenuItemStyled = styled.li<TypeMenuItemProps>(({ all }) => [
  xw`mx-4 my-10 lg:my-0`,
  all ? xw`lg:hidden` : '',
])
const SubMenuWrapStyled = styled.div<SubMenuProps>(({ show }) => [
  xw`bg-white lg:mt-2.5 lg:absolute lg:left-0 lg:right-0`,
  {
    display: show ? 'block' : 'none',
  },
])
const SubMenuTitle = styled.span(xw`text-12px lg:px-5`)
const SubMenuLink = styled.a(xw`flex text-13px lg:px-5 leading-tight`)

const SubMenuItemStyled = styled.li<SubMenuProps>(({ show = true }) => [
  xw`my-5 lg:my-0`,
  {
    display: show ? 'block' : 'none',
  },
])

const custom = {
  designers: [
    xw`justify-items-start lg:justify-start lg:max-w-screen-lg lg:mx-auto`,
    {
      [`${SubMenuItemStyled}`]: xw`mb-3.5 lg:w-1/4 xl:w-1/6`,
    },
  ],
  linhas: [
    `
    @media (min-width: 1024px) {
      display: block;
      column-width: 142px;
      column-gap: 4px;
      column-count: 6;
    }
  `,
  ],
}

const SubMenuStyled = styled.ul<SubMenuProps>(({ name }) => [
  xw`
  w-full bg-white
  pl-8 lg:pl-0 lg:mt-5 lg:pb-5
  flex-col
  lg:max-w-screen-lg lg:mx-auto
  lg:flex lg:flex-wrap lg:flex-row lg:justify-center
  `,
  {
    transition: 'opacity 350ms ease',
    [':hover']: {
      ['li']: {
        opacity: '.5',
        [':hover']: {
          opacity: 1,
        },
      },
    },
    ['span:hover']: {
      cursor: 'default',
    },
    ['a:hover']: {
      cursor: 'pointer',
    },
  },
  custom[name],
])

const SubMenuLabel = styled.a<SubMenuProps>(({ show, plus }) => [
  xw`inline-block text-13px hover:cursor-pointer`,
  {
    fontFamily: show ? 'FuturaStdMedium' : 'FuturaStdLight',
  },
  `
  &:after {
    content: ${plus ? (show ? '"-"' : '"+"') : ''};
  }
  `,
])

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
  isLink,
  isAll,
}: MenuItemProps) => {
  const shared = useAppContext()

  const handleToggle = (e: React.MouseEvent, name: string) => {
    if (!plus) return
    e.preventDefault()

    const _isOpen = shared.menuOpen === name ? !shared.menuIsOpen : true
    shared.addData({ menuOpen: name, menuIsOpen: _isOpen })
  }

  const isOpenMenu = (name: string) => {
    return shared.menuOpen === name && shared.menuIsOpen
  }

  return (
    <MenuItemStyled all={isAll}>
      <SubMenuLabel
        show={isOpenMenu(name)}
        plus={plus}
        onClick={e => handleToggle(e, name)}
        href={path}
      >
        {isLink && <Link href={path}>{name}</Link>}
        {!isLink && name}
      </SubMenuLabel>
      {items && (
        <SubMenuWrapStyled show={isOpenMenu(name)}>
          <SubMenuStyled show={isOpenMenu(name)} name={name}>
            {items.map(({ slug, name, title, photo }) => (
              <SubMenuItemStyled key={name}>
                {title && (
                  <SubMenuTitle css={xw`font-medium`}>{name}</SubMenuTitle>
                )}
                {!title && (
                  <Link href={`${path}/${slug}`} prefetch={false}>
                    <SubMenuLink>
                      {photo && photo[0] && (
                        <GraphImg
                          image={photo[0]}
                          alt={photo[0]?.alt}
                          fit="crop"
                          css={xw`mr-2.5 h-32px w-32px`}
                        />
                      )}
                      <MenuItemThumb slug={slug} />
                      {name}
                    </SubMenuLink>
                  </Link>
                )}
              </SubMenuItemStyled>
            ))}
          </SubMenuStyled>
        </SubMenuWrapStyled>
      )}
      {children}
    </MenuItemStyled>
  )
}
