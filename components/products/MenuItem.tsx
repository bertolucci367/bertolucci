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
  },
  custom[name],
  `
  &:hover {
    li {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }

  span:hover {
    cursor: default;
  }

  a:hover {
    cursor: pointer;
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

interface MenuItemProps {
  name?: string
  subItems?: any
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
  let _subItems = subItems

  if (lines) {
    let dic = {}
    let subLines = []
    subItems.forEach((item) => {
      const char = item.name.charAt(0)
      dic[char] = dic[char] ? [...dic[char], item] : [item]
    })

    for (var [key, value] of Object.entries(dic)) {
      subLines.push({ name: key, title: true })

      const arr: any = value
      arr.map((item: any) => subLines.push(item))
    }

    _subItems = subLines
  }

  const handleToggle = (name: string) => {
    if (!plus) return
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
        onClick={(e) => handleToggle(name)}
      >
        {name}
      </SubMenuLabel>
      {_subItems && (
        <SubMenuWrapStyled show={isOpenMenu(name)}>
          <SubMenuStyled show={isOpenMenu(name)} name={name}>
            {_subItems.map(({ slug, name, img, thumb, title }) => (
              <SubMenuItemStyled key={name}>
                {title && (
                  <SubMenuTitle css={xw`font-medium`}>{name}</SubMenuTitle>
                )}
                {!title && (
                  <Link href={`/produtos/${path}/${slugify(slug || name)}`}>
                    <SubMenuLink>
                      {img && <img src={img} css={xw`mr-2.5 h-32px w-32px`} />}
                      {thumb && thumb}
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
  { slug: 'column', name: 'coluna', thumb: <Thumb pos={4} /> },
  { slug: 'pending', name: 'pendente', thumb: <Thumb pos={6} /> },
  { slug: 'plafom', name: 'plafom', thumb: <Thumb pos={8} /> },
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
  { name: 'anamórfica' },
  { name: 'apoena' },
  { name: 'araucária' },
  { name: 'arco' },
  { name: 'atman' },
  { name: 'batuque' },
  { name: 'bella' },
  { name: 'berimbau' },
  { name: 'berloque' },
  { name: 'beto galvez e nórea de vitto' },
  { name: 'bionda' },
  { name: 'canoa' },
  { name: 'cantante' },
  { name: 'carimbó' },
  { name: 'cesta' },
  { name: 'címbalo' },
  { name: 'cine' },
  { name: 'ciranda' },
  { name: 'cresça e apareça' },
  { name: 'débora aguiar' },
  { name: 'deborah roig' },
  { name: 'dendê' },
  { name: 'dórica' },
  { name: 'drum' },
  { name: 'fernando piva' },
  { name: 'flash' },
  { name: 'fractus' },
  { name: 'francisco cálio' },
  { name: 'galeão' },
  { name: 'gras' },
  { name: 'guará' },
  { name: 'herba' },
  { name: 'ibira' },
  { name: 'ju' },
  { name: 'king size' },
  { name: 'leonardo' },
  { name: 'liana' },
  { name: 'lótus' },
  { name: 'luz ecológica' },
  { name: 'maracatu' },
  { name: 'marcelo rosenbaum' },
  { name: 'marina linhares' },
  { name: 'maxixe' },
  { name: 'minimum' },
  { name: 'mix print' },
  { name: 'mix simples e dupla' },
  { name: 'mube' },
  { name: 'mube coluna' },
  { name: 'nitens' },
  { name: 'nonno' },
  { name: 'nuvem' },
  { name: 'oito' },
  { name: 'olegário de sá e gilberto cioni' },
  { name: 'orecchiette' },
  { name: 'oscar mikail' },
  { name: 'otto' },
  { name: 'pequim' },
  { name: 'piá' },
  { name: 'poste' },
  { name: 'quadrados' },
  { name: 'queen size' },
  { name: 'raízes' },
  { name: 'ramy' },
  { name: 'realejo' },
  { name: 'roberto negrete' },
  { name: 'se vira!' },
  { name: 'siricutico' },
  { name: 'súber' },
  { name: 'taboa' },
  { name: 'tifa' },
  { name: 'tramas' },
  { name: 'tríade' },
  { name: 'tunga' },
  { name: 'umbu' },
  { name: 'universo' },
  { name: 'urucum' },
  { name: 'volta' },
  { name: 'zumbi' },
]

const slugify = (str) => {
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
