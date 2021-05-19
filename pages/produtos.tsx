import { GraphQLClient } from 'graphql-request'
import xw from 'xwind'
import styled from '@emotion/styled'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { ProductsQuery } from '~/graphcms/index'

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

const Products = ({ items }) => {
  return (
    <LayoutProduct>
      <h1 css={xw`h-0 opacity-0`}>Produtos</h1>
      <List items={items} useLineName />
    </LayoutProduct>
  )
}

export async function getStaticProps({ preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  const { page } = await gcms.request(ProductsQuery)
  const { items } = page

  return {
    props: { items, preview },
  }
}

export default Products
