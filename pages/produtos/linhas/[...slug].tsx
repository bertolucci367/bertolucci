import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'

const Lines = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <LayoutProduct>
      Lines: {slug}
      <p>
        <a onClick={router.back}>BACK</a>
      </p>
    </LayoutProduct>
  )
}

export default Lines
