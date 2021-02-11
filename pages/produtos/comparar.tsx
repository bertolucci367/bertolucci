import List from '~/components/products/List'
import LayoutProduct from '~/components/LayoutProduct'
import { useAppContext } from '~/components/context/AppContext'

const ComparePage = () => {
  const shared = useAppContext()

  return (
    <LayoutProduct>
      <List products={shared.compare} />
    </LayoutProduct>
  )
}

export default ComparePage
