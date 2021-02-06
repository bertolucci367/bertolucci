import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'

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
