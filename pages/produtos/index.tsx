import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { ProductsQuery } from '~/graphcms/index'
import { gcms } from '~/services/gcms'

const Products = ({ items }) => {
  return (
    <LayoutProduct>
      <h1 className={`sr-only`}>Produtos</h1>
      <List items={items} useLineName />
    </LayoutProduct>
  )
}

export async function getStaticProps({ preview = false }) {
  const { page } = await gcms.request(ProductsQuery)
  const { items } = page

  return {
    props: { items, preview },
  }
}

export default Products
