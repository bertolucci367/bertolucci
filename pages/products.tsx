import xw from 'xwind'
import styled from '@emotion/styled'
import Layout from '../components/Layout'

const Hover = styled.div([
  xw`lg:opacity-0`,
  {
    transition: 'opacity 350ms ease',
  },
])

const NameStyled = styled.h2(xw`text-14px`)

const DesignStyled = styled.p(xw`text-12px`)

const Card = styled.li({
  [`:hover ${Hover}`]: {
    opacity: 1,
  },
  height: '270px',
})

const SubMenu = styled.ul([
  xw`lg:opacity-0 lg:hidden w-full bg-red-100 absolute left-0 flex lg:justify-center py-4`,
  {
    transition: 'opacity 350ms ease',
  },
])

const SubMenuLabel = styled.span(xw``)

const MenuItemStyled = styled.li(xw`mx-4`, {
  [`:hover ${SubMenu}`]: {
    opacity: 1,
    cursor: 'pointer',
    zIndex: 50,
    display: 'flex',
  },
  [`:hover ${SubMenuLabel}`]: {
    color: 'red',
    cursor: 'pointer',
  },
})

const typologies = [
  { name: 'abajur' },
  { name: 'arandela' },
  { name: 'coluna' },
  { name: 'pendente' },
  { name: 'plafom' },
]
const materials = [
  { name: 'acrílico' },
  { name: 'cerâmica' },
  { name: 'cortiça' },
  { name: 'fibras naturais' },
  { name: 'madeira' },
  { name: 'metal' },
  { name: 'tecido' },
  { name: 'vidro' },
]
const designers = [
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

const families = [
  '2050',
  '3D de luxo',
  '85g',
  'abaeté',
  'alma',
  'apoena',
  'araucária',
  'atman',
  'batuque',
  'bella',
  'berimbau',
  'berloque',
  'beto galvez e nórea de vitto',
  'bionda',
  'canoa',
]

interface MenuItemProps {
  name?: string
  subItems?: any
  children?: React.ReactNode
}

const MenuItem = ({ name, subItems, children }: MenuItemProps) => {
  return (
    <MenuItemStyled>
      <SubMenuLabel>{name}</SubMenuLabel>
      {subItems && (
        <SubMenu>
          {subItems.map(({ name, img }) => (
            <li key={name} css={xw`px-4 py-2 w-1/5`}>
              {img && <img src={img} />}
              {name}
            </li>
          ))}
        </SubMenu>
      )}
      {children}
    </MenuItemStyled>
  )
}

const subMenu = (
  <nav css={xw`w-full`}>
    <ul css={xw`flex justify-center`}>
      <MenuItem name="tipologia+" subItems={typologies} />
      <MenuItem name="materiais+" subItems={materials} />
      <MenuItem name="designers+" subItems={designers} />
      <MenuItem name="linhas+" subItems={families} />
      <MenuItem name="busca">
        <input type="search" css={xw`border border-gray-500 ml-2`} />
      </MenuItem>
      <MenuItem name="baixar o catálogo" />
    </ul>
  </nav>
)

const Products = () => {
  const products = []

  for (let i = 0, l = 83; i < l; i++) {
    products.push({ id: i, name: `Product ${i}`, design: `oficina bertolucci` })
  }

  return (
    <Layout subMenu={subMenu}>
      <h1 css={xw`h-0 opacity-0`}>Produtos</h1>
      <ul
        css={[
          `grid-template-columns: repeat(auto-fill, minmax(225px, 1fr))`,
          xw`grid gap-x-1 col-start-1 col-end-4 lg:col-start-2 lg:col-end-3 row-start-2`,
        ]}
      >
        {products.map((product) => (
          <Card key={product.id}>
            <div
              css={[
                `width: 100%; height: 200px; background: url('${`https://placedog.net/360/280`}')`,
                xw`bg-gray-200 bg-center bg-cover`,
              ]}
            ></div>
            <Hover>
              <NameStyled>{product.name}</NameStyled>
              <DesignStyled>{product.design}</DesignStyled>
            </Hover>
          </Card>
        ))}
      </ul>
    </Layout>
  )
}

export default Products
