import Head from 'next/head'
import { AppWrapper } from '~/components/context/AppContext'

import '../styles/global.css'
import '../styles/base.css'

function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Head>
        <title>Bertolucci</title>
        <link
          rel="preload"
          href="/fonts/futura-light-bt.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/futura-medium-bt.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default App
