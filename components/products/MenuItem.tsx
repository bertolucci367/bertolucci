import { useEffect, useState } from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import { useAppContext } from '~/components/context/AppContext'

type SubMenuProps = {
  show?: boolean
  plus?: boolean
  name?: string
}

const MenuItemStyled = styled.li(xw`mx-4 my-10 lg:my-0`)

const SubMenuItemStyled = styled.li<SubMenuProps>(({ show }) => [
  xw`py-5 lg:py-0`,
  {
    display: show ? 'block' : 'none',
  },
])

const custom = {
  designers: [
    xw`justify-items-start lg:justify-start lg:max-w-screen-lg lg:mx-auto`,
    {
      [`${SubMenuItemStyled}`]: xw`lg:w-1/6 mb-3.5`,
    },
  ],
}

const SubMenuStyled = styled.ul<SubMenuProps>(({ show, name }) => [
  xw`w-full bg-white
  pl-8 lg:pl-0 lg:mt-5 lg:pb-5
  flex-col
  lg:absolute lg:left-0 lg:right-0 lg:max-w-screen-lg lg:mx-auto
  lg:flex lg:flex-wrap lg:flex-row lg:justify-center`,
  {
    transition: 'opacity 350ms ease',
    opacity: show ? '1' : '0',
    visibility: show ? 'visible' : 'hidden',
    height: show ? 'auto' : '0',
  },
  custom[name],
  `
  &:hover {
    li {
      opacity: 0.5;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  `,
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

const SubMenuLink = styled.a(xw`flex lg:px-5`)

interface MenuItemProps {
  name?: string
  subItems?: any
  path?: string
  children?: React.ReactNode
  plus?: boolean
}

export const MenuItem = ({
  name,
  subItems,
  path,
  children,
  plus,
}: MenuItemProps) => {
  const shared = useAppContext()
  const [open, setOpen] = useState(false)

  const handleToggle = (name: string) => {
    if (!plus) return
    setOpen(!open)
    shared.addData({ menuOpen: name })
  }

  useEffect(() => {
    if (!plus) return
    if (shared.menuOpen !== name) setOpen(false)
  }, [shared.menuOpen])

  return (
    <MenuItemStyled>
      <SubMenuLabel show={open} plus={plus} onClick={(e) => handleToggle(name)}>
        {name}
      </SubMenuLabel>
      {subItems && (
        <SubMenuStyled show={open} name={name}>
          {subItems.map(({ name, img, thumb }) => (
            <SubMenuItemStyled key={name} show={open}>
              <Link href={`/produtos/${path}/${slugify(name)}`}>
                <SubMenuLink>
                  {img && (
                    <img src={img} css={[xw`mr-2.5`, { float: 'left' }]} />
                  )}
                  {thumb && thumb}
                  {name}
                </SubMenuLink>
              </Link>
            </SubMenuItemStyled>
          ))}
        </SubMenuStyled>
      )}
      {children}
    </MenuItemStyled>
  )
}

const Thumb = ({ pos }) => {
  return (
    <div css={[xw`overflow-hidden`, { height: '32px' }]}>
      <div
        css={{
          marginTop: `-${32 * pos}px`,
          marginRight: '4px',
          // ':hover': { marginTop: `-${32 * (pos + 1)}px` },
        }}
      >
        <Image src="/pic_thumbs.png" layout="fixed" height={448} width={32} />
      </div>
    </div>
  )
}

export const typologies = [
  {
    slug: 'lampshade',
    name: 'abajur',
    thumb: <Thumb pos={0} />,
  },
  {
    slug: 'sconce',
    name: 'arandela',
    thumb: <Thumb pos={2} />,
  },
  { name: 'coluna', thumb: <Thumb pos={4} /> },
  { name: 'pendente', thumb: <Thumb pos={6} /> },
  { name: 'plafom', thumb: <Thumb pos={8} /> },
]

export const materials = [
  { name: 'acrilico' },
  { name: 'ceramica' },
  { name: 'cortiça' },
  { name: 'fibras naturais' },
  { name: 'madeira' },
  { name: 'metal' },
  { name: 'tecido' },
  { name: 'vidro' },
]

export const designers = [
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/517ed6eb43493b7e4600009d/thumb_ana-strumpf.jpg',
    name: 'ana strumpf',
    slug: 'ana-strumpf',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/56df1be8a7ab750602000003/thumb_atelier-bam.jpg',
    name: 'atelier bam',
    slug: 'atelier-bam',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/5098140b43493b4870000006/thumb_beto-galvez-norea-de-vitto.jpg',
    name: 'beto galvez e nórea de vitto',
    slug: 'beto-galvez-e-norea-de-vitto',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/509d3b1b43493b540a000012/thumb_atelier-marko-brajovic.jpg',
    name: 'atelier marko brajovic',
    slug: 'atelier-marko-brajovic',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5188f96d43493b130c000005/thumb_camila_sarpi.jpg',
    name: 'camila sarpi',
    slug: 'camila-sarpi',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/5098142443493b487000000a/thumb_claudia-moreira-salles.jpg',
    name: 'claudia moreira salles',
    slug: 'claudia-moreira-salles',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5098144943493b4876000004/thumb_Deborah-Roig.jpg',
    name: 'deborah roig',
    slug: 'deborah-roig',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5098143643493b487000000c/thumb_debora-aguiar.jpg',
    name: 'débora aguiar',
    slug: 'debora-aguiar',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/517ed62943493b7e4600009c/thumb_etel-carmona.jpg',
    name: 'etel carmona',
    slug: 'etel-carmona',
  },
  {
    img:
      'http://assets2.bertolucci.com.br/uploads/designer_images/image/56deec08a7ab7506ba000001/thumb_fernanda-yamamoto.jpg',
    name: 'fernanda yamamoto',
    slug: 'fernanda-yamamoto',
  },
  {
    img:
      'http://assets1.bertolucci.com.br/uploads/designer_images/image/5098145c43493b4873000008/thumb_fernando-piva.jpg',
    name: 'fernando piva',
    slug: 'fernando-piva',
  },
]

export const families = [
  { name: '2050' },
  { name: '3D de luxo' },
  { name: '85g' },
  { name: 'abaeté' },
  { name: 'alma' },
  { name: 'apoena' },
  { name: 'araucária' },
  { name: 'atman' },
  { name: 'batuque' },
  { name: 'bella' },
  { name: 'berimbau' },
  { name: 'berloque' },
  { name: 'beto galvez e nórea de vitto' },
  { name: 'bionda' },
  { name: 'canoa' },
]

const slugify = (text) => {
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeeiiiiooooouuuunc------'

  const newText = text
    .split('')
    .map((letter, i) =>
      letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)),
    )

  return newText
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-y-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}
