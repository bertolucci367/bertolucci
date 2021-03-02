import { useEffect } from 'react'
import { useRouter } from 'next/router'
import xw from 'xwind'

import Layout from './Layout'
import { useAppContext } from '~/components/context/AppContext'
import CompareList from '~/components/products/CompareList'
import Designer from '~/components/products/Designer'
import CompareForm from '~/components/products/CompareForm'

interface LayoutProductProps {
  search?: string
  children?: React.ReactNode
  designer?: any
}

const LayoutProduct = ({ children, search, designer }: LayoutProductProps) => {
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
    <Layout>
      <div
        css={[
          xw`
          col-start-2 col-end-3 row-start-2 row-end-2
          lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-2
          lg:px-4 lg:pb-logoFooter
          `,
        ]}
      >
        {designer && <Designer designer={designer} />}

        <CompareList />
        <CompareForm />
      </div>
      <div css={[xw`col-start-2 col-end-3`]}>{children}</div>
    </Layout>
  )
}

export default LayoutProduct
