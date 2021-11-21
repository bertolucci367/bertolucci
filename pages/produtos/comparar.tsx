import List from '~/components/products/List'
import LayoutProduct from '~/components/LayoutProduct'
import { useAppContext } from '~/components/context/AppContext'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { addArray } from '~/components/products/compare'

interface DataProps {
  products: []
}

const ComparePage = () => {
  const shared = useAppContext()
  const router = useRouter()
  const [listItems, setListItems] = useState([])
  const {
    query: { p },
  } = router

  const _slugs: any =
    shared.compare.length > 0
      ? shared.compare.map(o => o.slug)
      : Array.isArray(p)
      ? p
      : [p]

  // Example:
  // shared.compare = [{ slug: 'ju-ab', code: 'A920', name: 'ju.ab' }]

  const { data, error } = useSWR<DataProps>(
    `/api/compare?slugs=${_slugs}`,
    fetcher,
  )

  useEffect(() => {
    if (!data) return

    const { products } = data

    if (!products) return

    setListItems(products)

    addArray({ products, shared })
  }, [data])

  return (
    <LayoutProduct title="Produtos selecionados">
      {shared.compare.length === 0 && (
        <h2 className="text-center my-20">Nenhum produto selecionado.</h2>
      )}
      {shared.compare.length > 0 && (
        <List products={listItems} show compare nameVisible />
      )}
    </LayoutProduct>
  )
}

export default ComparePage
