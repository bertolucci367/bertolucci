import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'

const Lines = ({ products, product }) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <LayoutProduct>
      Lines: {slug}
      <p>
        <a onClick={router.back}>BACK</a>
      </p>
      <hr />
      <List products={product} show />
      <List products={products} show />
    </LayoutProduct>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { slug } = params

  const code = slug[1]

  const res = await fetch(
    `http://bertolucci.com.br/api/produtos/linhas/${slug[0]}.json`,
  )
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  const { products } = data
  let product = []
  let idx = -1

  if (code) {
    idx = products.findIndex((p) => p.code === code)
    product = products.splice(idx, 1)
  }

  return {
    props: { products, product }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const res = await fetch(
    `http://bertolucci.com.br/api/produtos/novolayout.json`,
  )
  const data = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = data.products.map((p: any) => ({
    params: { slug: [p.family_slug, p.code] },
  }))

  return { paths, fallback: 'blocking' }
}

export default Lines
