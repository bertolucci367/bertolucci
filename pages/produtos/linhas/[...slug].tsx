import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useAppContext } from '~/components/context/AppContext'

const Lines = ({ products, product }) => {
  const router = useRouter()
  const shared = useAppContext()

  shared.productClosePath = `/produtos/linhas`

  return (
    <LayoutProduct>
      <List
        items={[product]}
        show
        close={{
          pathname: '/produtos',
        }}
      />
      <List items={[products]} show />
    </LayoutProduct>
  )
}

const query = `
  query Line($id: String!) {
    values: line (where: { slug: $id}, stage: PUBLISHED) {
      id
      stage
      updatedAt
      createdAt
      id
      name
      products {
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
`

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { slug } = params
  const [id, code] = slug
  const data = await gcms.request(query, { id })

  if (!data) {
    return {
      notFound: true,
    }
  }

  const { values } = data
  const { products } = values
  let product = []
  let idx = 0

  if (code) {
    idx = products.findIndex((p: any) => p.code === code)
  }

  product = products.splice(idx, 1)

  return {
    props: {
      products: { ...values, products: products },
      product: { ...values, products: product },
    }, // will be passed to the page component as props
  }
}

const _paths = `
query Lines {
  values: lines(where: {NOT: {slug: "null"}}) {
    slug
    products {
      code
    }
  }
}
`

export async function getStaticPaths() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(_paths)

  // Get the paths we want to pre-render based on posts
  const paths = []

  values.forEach((el: any) => {
    el.products.forEach((product: any) => {
      paths.push({
        params: { slug: [el.slug, product.code] },
      })
    })
  })

  return { paths, fallback: 'blocking' }
}

export default Lines
