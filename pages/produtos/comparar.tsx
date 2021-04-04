import List from '~/components/products/List'
import LayoutProduct from '~/components/LayoutProduct'
import { useAppContext } from '~/components/context/AppContext'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { addArray } from '~/components/products/compare'

const ComparePage = () => {
  const shared = useAppContext()
  const router = useRouter()
  const {
    query: { p = [] },
  } = router
  const _slugs: any =
    shared.compare.length > 0 ? shared.compare.map(o => o.slug) : p

  // Example:
  // shared.compare = [{ slug: 'ju-ab', code: 'A920', name: 'ju.ab' }]

  const { data, error } = useSWR(
    `/api/compare?slugs=${_slugs.join(',')}`,
    fetcher,
  )

  useEffect(() => {
    if (!data || shared.compare.length > 0) return

    const { products } = data

    if (!products) return

    addArray({ products, shared })
  }, [data])

  return (
    <LayoutProduct>
      {data && <List products={data.products} show compare />}
    </LayoutProduct>
  )
}

export default ComparePage
