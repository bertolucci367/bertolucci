import xw from 'xwind'
import styled from '@emotion/styled'
import Layout from '../components/Layout'

const Hover = styled.div([
  xw`opacity-0`,
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

  return (
    <Layout>
      <h1 css={xw`h-0 opacity-0`}>Produtos</h1>
      <ul
        css={[
          `grid-template-columns: repeat(auto-fill, minmax(225px, 1fr))`,
          xw`grid gap-x-1`,
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
