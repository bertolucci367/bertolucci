import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useAppContext } from '~/components/context/AppContext'

const ProductTypeCode = ({ product, products }) => {
  const router = useRouter()

  const { slug, filter } = router.query

  const shared = useAppContext()
  shared.goToLines = true
  shared.productClosePath = `/produtos/${slug}/${filter}/linhas`

  return (
    <LayoutProduct>
      <List
        products={product}
        show
        close={{
          pathname: '/produtos/[slug]/[filter]',
          query: { slug, filter },
        }}
      />
      <List products={products} show />
    </LayoutProduct>
  )
}

export async function getServerSideProps({ params }) {
  const { linha, code } = params

  const res = await fetch(
    `http://bertolucci.com.br/api/produtos/linhas/${linha}.json`,
  )
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  const { products } = data
  let product = []
  let idx = 0

  if (code) {
    idx = products.findIndex((p) => p.code === code)
  }

  product = products.splice(idx, 1)

  return {
    props: { products, product }, // will be passed to the page component as props
  }
}

export default ProductTypeCode
