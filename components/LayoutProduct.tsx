import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from './Layout'
import { useAppContext } from '~/components/context/AppContext'
import CompareList from '~/components/products/CompareList'
import Designer from '~/components/products/Designer'
import CompareForm from '~/components/products/CompareForm'

interface LayoutProductProps {
  search?: string
  children?: React.ReactNode
  designer?: any
  title?: string
}

const LayoutProduct = ({
  children,
  designer,
  title = 'produtos',
}: LayoutProductProps) => {
  const router = useRouter()
  const shared = useAppContext()

  useEffect(() => {
    const handleRouteComplete = () => {
      shared.addData({ menuIsOpen: false })
    }

    router.events.on('routeChangeComplete', handleRouteComplete)
    return () => router.events.off('routeChangeComplete', handleRouteComplete)
  }, [])

  return (
    <Layout title={title}>
      <aside
        className={`
          col-start-2 col-end-3 row-start-2 row-end-2
          lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-2
          lg:px-4 lg:pb-logoFooter
          `}
      >
        {designer && <Designer designer={designer} />}

        <CompareList />
        <CompareForm />
      </aside>
      <main className={`col-start-2 col-end-3`}>{children}</main>
    </Layout>
  )
}

export default LayoutProduct
