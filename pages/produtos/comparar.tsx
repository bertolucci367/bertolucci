import List from '~/components/products/List'
import LayoutProduct from '~/components/LayoutProduct'
import { useAppContext } from '~/components/context/AppContext'

const ComparePage = () => {
  const shared = useAppContext()

  return (
    <LayoutProduct>
      <List products={[]} />
    </LayoutProduct>
  )
}

// TODO: needs get product data from shared.compare slugs

export default ComparePage
