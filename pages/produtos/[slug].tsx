import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'

const Product = () => {
  const router = useRouter()
  const { slug } = router.query

  return <LayoutProduct>Product: {slug}</LayoutProduct>
}

export default Product
