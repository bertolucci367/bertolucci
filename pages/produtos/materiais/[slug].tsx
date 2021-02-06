import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'

const Material = () => {
  const router = useRouter()
  const { slug } = router.query

  return <LayoutProduct>Material: {slug}</LayoutProduct>
}

export default Material
