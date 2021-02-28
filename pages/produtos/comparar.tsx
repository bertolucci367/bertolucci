import List from '~/components/products/List'
import LayoutProduct from '~/components/LayoutProduct'
import { useAppContext } from '~/components/context/AppContext'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'

const ComparePage = () => {
  const shared = useAppContext()

  // Example:
  // shared.compare = [{ slug: 'ju-ab', code: 'A920', name: 'ju.ab' }]

  const { data, error } = useSWR(
    `/api/compare?slugs=${shared.compare.map(o => o.slug).join(',')}`,
    fetcher,
  )

  return (
    <LayoutProduct>
      {data && <List products={data.products} show compare />}
    </LayoutProduct>
  )
}

export default ComparePage
