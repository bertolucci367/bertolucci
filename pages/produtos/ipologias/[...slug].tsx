import { useRouter } from 'next/router'
import LayoutProduct from '../~/components/LayoutProduct'

const Typology = () => {
  const router = useRouter()
  const { slug } = router.query

  console.log(slug)

  return <LayoutProduct>Typology</LayoutProduct>
}

export default Typology
