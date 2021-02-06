import xw from 'xwind'
import styled from '@emotion/styled'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'

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

  console.log('bla2')

  for (let i = 0, l = 83; i < l; i++) {
    products.push({ id: i, name: `Product ${i}`, design: `oficina bertolucci` })
  }

  return (
    <LayoutProduct>
      <h1 css={xw`h-0 opacity-0`}>Produtos</h1>
      <List products={products} href="/produtos/linhas/nitens/C870" />
    </LayoutProduct>
  )
}

export default Products
