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

const Products = () => {
  const products = []

  for (let i = 0, l = 83; i < l; i++) {
    products.push({ id: i, name: `Product ${i}`, design: `oficina bertolucci` })
  }

  const subMenu = (
    <nav css={xw`w-full`}>
      <ul css={xw`flex justify-around`}>
        <li>
          tipologia+
          <ul css={xw`flex justify-around w-full`}>
            <li>abajur</li>
            <li>arandela</li>
            <li>coluna</li>
          </ul>
        </li>
        <li>materiais+</li>
        <li>designers+</li>
        <li>linhas+</li>
        <li>busca</li>
        <li>baixar catalago</li>
      </ul>
    </nav>
  )

  return (
    <Layout subMenu={subMenu}>
      <h1 css={xw`h-0 opacity-0`}>Produtos</h1>
      {/* <Portal id="subMenu">
        <p>Thinking with portals</p>
      </Portal> */}
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
