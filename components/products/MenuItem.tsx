import { useEffect, useState } from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { useAppContext } from '~/components/context/AppContext'
import fetcher from '~/components/libs/fetcher'

type SubMenuProps = {
  show?: boolean
  plus?: boolean
  name?: string
}

const MenuItemStyled = styled.li(xw`mx-4 my-10 lg:my-0`)
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

const SubMenuLabel = styled.span<SubMenuProps>(({ show, plus }) => [
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
  subItems?: string
  path?: string
  children?: React.ReactNode
  plus?: boolean
  lines?: boolean
}

export const MenuItem = ({
  name,
  subItems,
  path,
  children,
  plus,
  lines,
}: MenuItemProps) => {
  const shared = useAppContext()
  const [shouldFetch, setShouldFetch] = useState(false)
  const url = `/api/submenu?id=${subItems}`
  const { data, error } = useSWR<any[]>(
    () => (shouldFetch ? url : null),
    fetcher,
  )

  const handleToggle = (name: string) => {
    if (!plus) return
    setShouldFetch(true)
    const _isOpen = shared.menuOpen === name ? !shared.menuIsOpen : true
    shared.addData({ menuOpen: name, menuIsOpen: _isOpen })
  }

  const isOpenMenu = (name: string) => {
    return shared.menuOpen === name && shared.menuIsOpen
  }

  return (
    <MenuItemStyled>
      <SubMenuLabel
        show={isOpenMenu(name)}
        plus={plus}
        onClick={e => handleToggle(name)}
      >
        {name}
      </SubMenuLabel>
      {data && (
        <SubMenuWrapStyled show={isOpenMenu(name)}>
          <SubMenuStyled show={isOpenMenu(name)} name={name}>
            {data.map(({ slug, name, img, thumb, title }) => (
              <SubMenuItemStyled key={name}>
                {title && (
                  <SubMenuTitle css={xw`font-medium`}>{name}</SubMenuTitle>
                )}
                {!title && (
                  <Link
                    href={`/produtos/${path}/${slugify(slug || name)}`}
                    prefetch={false}
                  >
                    <SubMenuLink>
                      {img && (
                        <img
                          src={img}
                          css={xw`mr-2.5 h-32px w-32px`}
                          alt={name}
                          height={32}
                          width={32}
                        />
                      )}
                      {thumb && <Thumb slug={slug} />}
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

const Thumb = ({ slug }) => {
  const posBySlug = {
    lampshade: 0,
    sconce: 2,
    column: 4,
    pending: 6,
    plafom: 8,
  }

  return (
    <div css={[xw`overflow-hidden`, { height: '32px' }]}>
      <div
        css={{
          marginTop: `-${32 * posBySlug[slug]}px`,
          marginRight: '4px',
        }}
      >
        <Image src="/pic_thumbs.png" layout="fixed" height={448} width={32} />
      </div>
    </div>
  )
}

const slugify = str => {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeiiiioooouuuunc------'

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text

  return str
}
