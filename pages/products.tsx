import xw from 'xwind'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import Portal from '../components/Portal'

const Hover = styled.div([
  xw`lg:opacity-0`,
  {
    transition: 'opacity 350ms ease',
  },
])

const Name = styled.h2(xw`text-14px`)

const Design = styled.p(xw`text-12px`)

const Card = styled.li({
  [`:hover ${Hover}`]: {
    opacity: 1,
  },
  height: '270px',
})

const SubMenu = styled.ul([
  xw`lg:opacity-0 w-full bg-red-100 absolute left-0 flex lg:justify-center py-4`,
  {
    transition: 'opacity 350ms ease',
  },
])

const MenuItem = styled.li({
  [`:hover ${SubMenu}`]: {
    opacity: 1,
    cursor: 'pointer',
    zIndex: 50,
  },
})

const typologies = ['abajur', 'arandela', 'coluna', 'pendente', 'plafom']
const materials = [
  'acrílico',
  'cerâmica',
  'cortiça',
  'fibras naturais',
  'madeira',
  'metal',
  'tecido',
  'vidro',
]

const subMenu = (
  <nav css={xw`w-full`}>
    <ul css={xw`flex justify-evenly`}>
      <MenuItem>
        tipologia+
        <SubMenu>
          {typologies.map((t) => (
            <li key={t} css={xw`px-4 py-2 w-1/5`}>
              {t}
            </li>
          ))}
        </SubMenu>
      </MenuItem>
      <MenuItem>
        materiais+
        <SubMenu>
          {materials.map((v) => (
            <li key={v} css={xw`px-4 py-2`}>
              {v}
            </li>
          ))}
        </SubMenu>
      </MenuItem>
      <li>designers+</li>
      <li>linhas+</li>
      <li>busca</li>
      <li>baixar catalago</li>
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
              <Name>{product.name}</Name>
              <Design>{product.design}</Design>
            </Hover>
          </Card>
        ))}
      </ul>
    </Layout>
  )
}

export default Products
