import xw from 'xwind'
import styled from '@emotion/styled'
import Image from 'next/image'
import LayoutProduct from '~/components/LayoutProduct'
import Container from '~/components/Container'
import Carousel from '~/components/Carousel'
import { GraphQLClient } from 'graphql-request'
import { useAppContext } from '~/components/context/AppContext'
import Properties from '~/components/products/Properties'
import Finishings from '~/components/products/Finishings'

const InfoStyled = styled.div([
  xw`
    bg-white text-center
    `,
])

const InfoBody = styled.div(xw`text-14px lg:flex`)

const InfoTextBlock = styled.div(xw`lg:flex-1 text-left`)

const Product = ({ product }) => {
  const shared = useAppContext()

  const [line] = product.lines

  let path = shared.productClosePath

  if (shared.goToLines) {
    path = `${shared.productClosePath}/linhas/${line.slug}/${product.code}`
  }

  const images = product.photo.map((img: any) => (
    <img src={img.url} height={img.height} width={img.width} alt={img.alt} />
  ))

  return (
    <LayoutProduct>
      <Container>
        <Carousel slides={images} close={path} nav>
          <InfoStyled>
            <h1 css={xw`font-medium text-14px sticky top-0 bg-white py-2.5`}>
              {product.name} - {product.code}
            </h1>

            <InfoBody>
              <InfoTextBlock
                dangerouslySetInnerHTML={{
                  __html: product?.description?.html,
                }}
              ></InfoTextBlock>

              <InfoTextBlock css={xw`lg:ml-5 mt-10 lg:mt-0`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.text.html,
                  }}
                ></div>

                <Properties product={product} />

                <p>
                  <label css={xw`hidden`}>tipos de lâmpada</label>
                </p>
                <ul>
                  {product.lampTypes &&
                    product.lampTypes.map(lamp => (
                      <li key={lamp.id}>{lamp.name}</li>
                    ))}
                </ul>

                <Finishings finishings={product.finishings} />
              </InfoTextBlock>
            </InfoBody>
          </InfoStyled>
        </Carousel>
      </Container>
    </LayoutProduct>
  )
}

const query = `
  query Product($id: String!) {
    values: product (where: { slug: $id}, stage: PUBLISHED) {

      slug
      code
      name
      width
      depth
      height
      diameter
      text {
        html
      }
      description {
        html
      }
      designer {
        name
      }
      photo(skip: 1) {
        url
        alt
        width
        height
      }
      lines(first: 1) {
        slug
      }
      lampTypes {
        id
        name
      }
      finishings {
        id
        name
        category {
          name
        }
        thumb {
          url
          handle
          width
          height
        }
      }
    }

  }
`

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { slug } = params
  const { values } = await gcms.request(query, { id: slug })

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product: values,
    }, // will be passed to the page component as props
  }
}

const _paths = `
query Products {
  values: products {
    slug
  }
}
`

export async function getStaticPaths() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(_paths)

  // Get the paths we want to pre-render based on posts
  const paths = values.map(el => ({ params: { slug: el.slug } }))

  return { paths, fallback: false }
}

export default Product
