import { GetStaticProps } from 'next'
import { GraphQLClient } from 'graphql-request'
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

const Products = ({ page }) => {
  return (
    <LayoutProduct>
      <h1 css={xw`h-0 opacity-0`}>Produtos</h1>
      <List items={page.items} />
    </LayoutProduct>
  )
}

export async function getStaticProps({ preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  const { page } = await gcms.request(
    `
    query ProductPage {
      page(where: {slug: "produtos"}) {
        items {
          ... on Line {
            __typename
            id
            name
            products(first: 1) {
              name
              code
              slug
              designer {
                name
              }
              photo {
                handle
                height
                width
                alt
              }
            }
          }
        }
      }
    }

    `,
  )

  return {
    props: { page, preview },
  }
}

export default Products
