import { useEffect, useState } from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useAppContext } from '~/components/context/AppContext'

type SubMenuProps = {
  show?: boolean
}

const SubMenuStyled = styled.ul<SubMenuProps>(({ show }) => [
  xw`w-full
  pl-8 lg:pl-0
  lg:absolute lg:left-0
  lg:flex flex-col
  lg:flex lg:justify-center`,
  {
    transition: 'opacity 350ms ease',
    opacity: show ? '1' : '0',
    visibility: show ? 'visible' : 'hidden',
    height: show ? 'auto' : '0',
  },
])

const SubMenuItemStyled = styled.li(xw`py-5 lg:py-0`)

const SubMenuLabel = styled.span<SubMenuProps>(({ show }) => [
  xw`inline-block text-13px`,
  {
    fontFamily: show ? 'FuturaStdMedium' : 'FuturaStdLight',
  },
  `
  &:after {
    content: ${show ? '"-"' : '"+"'};
  }
  `,
])

const MenuItemStyled = styled.li(xw`mx-4 my-10 lg:my-0`)

export const typologies = [
  { name: 'lampshade' },
  { name: 'arandela' },
  { name: 'coluna' },
  { name: 'pendente' },
  { name: 'plafom' },
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
  const [curr, _] = useState(name)

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
      <SubMenuLabel show={open} onClick={(e) => handleToggle(name)}>
        {name}
      </SubMenuLabel>
      {subItems && (
        <SubMenuStyled show={open}>
          {subItems.map(({ name, img }) => (
            <SubMenuItemStyled key={name}>
              <Link href={`/produtos/${path}/${slugify(name)}`}>
                <a css={xw`flex`}>
                  {img && <img src={img} css={xw`float-left mr-4`} />}
                  {name}
                </a>
              </Link>
            </SubMenuItemStyled>
          ))}
        </SubMenuStyled>
      )}
      {children}
    </MenuItemStyled>
  )
}
