import List from '~/components/products/List'
import LayoutProduct from '~/components/LayoutProduct'
import { useAppContext } from '~/components/context/AppContext'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'

const ComparePage = () => {
  const shared = useAppContext()
  // const slugs = shared.compare.map((item) => item.slug)
  const slugs = ['umbu-4-dot-pe', 'luz-ecologica-dot-ar']
  const { data, error } = useSWR<any[]>(
    `/api/compare?slug=${slugs.join(',')}`,
    fetcher,
  )

  return (
    <LayoutProduct>
      <List products={data} show compare />
    </LayoutProduct>
  )
}

export default ComparePage
