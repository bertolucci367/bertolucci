import Image from 'next/image'
import CookieBanner from '~/components/CookieBanner'
import Head from 'next/head'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

interface LayoutProps {
  children?: React.ReactNode
  title?: string
  description?: string
  showCookie?: boolean
}

const Layout = ({
  children,
  title = '',
  description = 'bertolucci - Dedicada ao Brasil desde 1956',
  showCookie = true,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{[title, 'bertolucci'].filter(Boolean).join(' | ')}</title>
        <meta name="description" content={description}></meta>
      </Head>

      <div
        className="h-full min-h-screen
                   grid grid-areas-slim grid-cols-slim lg:grid-areas-wide lg:grid-cols-wide
                   grid-rows-slim lg:grid-rows-slim-wide"
      >
        <Header />

        {children}

        <Footer />

        {showCookie && <CookieBanner />}
      </div>
    </>
  )
}

export default Layout
