import { GraphQLClient } from 'graphql-request'
import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useAppContext } from '~/components/context/AppContext'
import { LineQuery } from '~/graphcms/index'
import { useEffect } from 'react'

const LinesByMaterial = ({ products, product }) => {
  const router = useRouter()
  const shared = useAppContext()

  const { slug, ids } = router.query

  useEffect(() => {
    shared.addData({
      goToLines: true,
      productClosePath: `/produtos/materiais/${slug}`,
    })
  }, [])

  return (
    <LayoutProduct>
      <List
        items={[product]}
        show
        useProductCode
        close={{
          pathname: `/produtos/materiais/${slug}`,
        }}
      />
      <List items={[products]} show useProductCode />
    </LayoutProduct>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { ids } = params
  const [id, code] = ids
  const data = await gcms.request(LineQuery, { id })
  const { values } = data

  if (!data) {
    return {
      notFound: true,
    }
  }

  const { products } = values || { products: [] }

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
query LinesByMaterial {
  values: materials(where: {NOT: {slug: "null"}}) {
    slug
    products {
      code
      lines {
        slug
      }
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
      const [line] = product.lines
      paths.push({
        params: { slug: el.slug, ids: [line.slug, product.code] },
      })
    })
  })

  return { paths, fallback: 'blocking' }
}

export default LinesByMaterial
