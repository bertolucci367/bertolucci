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
      <aside className="grid-in-l">
        {designer && <Designer designer={designer} />}
        <div
          className={`
          text-center fixed left-0 bottom-0 w-full z-[99]
          lg:sticky lg:top-1/2 lg:-translate-y-1/2
          animate-slide-footer
        `}
        >
          <div className="lg:my-[9rem]">
            <CompareList />
            <CompareForm className="" />
          </div>
        </div>
      </aside>
      <main className="grid-in-main">{children}</main>
    </Layout>
  )
}

export default LayoutProduct
