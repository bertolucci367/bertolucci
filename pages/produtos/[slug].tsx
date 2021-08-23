import Head from 'next/head'
import LayoutProduct from '~/components/LayoutProduct'
import Container from '~/components/Container'
import Carousel from '~/components/Carousel'
import { GraphQLClient } from 'graphql-request'
import { useAppContext } from '~/components/context/AppContext'
import Properties from '~/components/products/Properties'
import Finishings from '~/components/products/Finishings'

import style from './product.module.css'

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
    <LayoutProduct
      title={product.seo?.title || `${product.name} - ${product.code}`}
    >
      <Head>
        <meta
          name="description"
          content={product.seo?.description || product.text?.text}
        ></meta>
        <meta
          name="keywords"
          content={product.seo?.keywords.map(k => k.name).join(',')}
        ></meta>
      </Head>
      <Container>
        <Carousel slides={images} close={path} nav>
          <div className={`${style.description} text-center mb-20 lg:mb-0`}>
            <h1 className={`font-medium text-14px pt-3 pb-2.5`}>
              {product.name} - {product.code}
            </h1>

            <div className="text-14px lg:flex">
              <div
                className="lg:flex-1 text-left"
                dangerouslySetInnerHTML={{
                  __html: product?.description?.html,
                }}
              ></div>

              <div className={`lg:flex-1 text-left lg:ml-5 mt-10 lg:mt-0`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.text.html,
                  }}
                ></div>

                <Properties product={product} />

                <p>
                  <label className={`hidden`}>tipos de lâmpada</label>
                </p>
                <ul>
                  {product.lampTypes &&
                    product.lampTypes.map(lamp => (
                      <li key={lamp.id}>{lamp.name}</li>
                    ))}
                </ul>

                <Finishings
                  finishings={[...line.finishings, ...product.finishings]}
                />
              </div>
            </div>
          </div>
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
        text
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
        finishings {
          id
          name
          stage
          category {
            name
          }
          thumb {
            url
            alt
            handle
            width
            height
          }
        }
      }
      lampTypes {
        id
        name
      }
      finishings {
        id
        name
        stage
        category {
          name
        }
        thumb {
          url
          alt
          handle
          width
          height
        }
      }

      seo {
        title
        description
        keywords {
          name
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
  values: products(first: 10000) {
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
