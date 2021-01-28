import xw from 'xwind'
import styled from '@emotion/styled'
import LayoutProduct from '~/components/LayoutProduct'

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

const Products = () => {
  const products = []

  for (let i = 0, l = 83; i < l; i++) {
    products.push({ id: i, name: `Product ${i}`, design: `oficina bertolucci` })
  }

  return (
    <LayoutProduct>
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
    </LayoutProduct>
  )
}

export default Products
