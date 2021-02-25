import xw from 'xwind'
import styled from '@emotion/styled'
import LayoutProduct from '~/components/LayoutProduct'
import Container from '~/components/Container'
import Carousel from '~/components/Carousel'
import { GraphQLClient } from 'graphql-request'
import { useAppContext } from '~/components/context/AppContext'

const InfoStyled = styled.div([
  xw`
    bg-white text-center py-6
    overflow-hidden
    transition-all
    `,
])

const InfoBody = styled.div(xw`text-14px lg:flex`)

const InfoTextBlock = styled.div(xw`lg:flex-1 text-left`)

const FinishingCategoryStyled = styled.li({
  [':after']: {
    content: '"/"',
    padding: '0 5px',
  },
})

const Product = ({ product }) => {
  const shared = useAppContext()

  let path = `${shared.productClosePath}/linhas/${product.family_slug}/${product.code}`

  if (!shared.goToLines) {
    path = shared.productClosePath
  }

  const images = product.photo.map((img: any) => {
    return <img src={img.url} />
  })

  return (
    <LayoutProduct>
      <Container>
        <Carousel slides={images} close={path} nav>
          <InfoStyled>
            <hgroup className="itemInfo">
              <h2 css={xw`text-14px mb-1 font-medium`}>
                {product.name} - {product.code}
              </h2>
              <h3></h3>
            </hgroup>

            <InfoBody>
              <InfoTextBlock
                dangerouslySetInnerHTML={{
                  __html: product?.description?.html,
                }}
              ></InfoTextBlock>

              <InfoTextBlock css={xw`lg:ml-5`}>
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: product.text_formatted,
                  }}
                ></div> */}

                <p>
                  <span>
                    <label>H</label> 55 cm
                  </span>
                  <span>
                    <label className="dimention">L</label>45 cm"
                  </span>
                  <span>
                    <label className="dimention">P</label> 20 cm"
                  </span>
                </p>

                <p>
                  <label className="none">tipo de lâmpada</label>3 x LED E27
                </p>

                <label css={xw`font-medium`}>acabamentos</label>

                <div>
                  <ul css={xw`flex`}>
                    <FinishingCategoryStyled>madeiras</FinishingCategoryStyled>
                    <FinishingCategoryStyled>cobre</FinishingCategoryStyled>
                    <FinishingCategoryStyled>latão</FinishingCategoryStyled>
                  </ul>
                </div>
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

      name
      code
      slug
      description {
        html
      }
      designer {
        name
      }
      photo(skip: 1) {
        url
        alt
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

  return { paths, fallback: 'blocking' }
}

export default Product
