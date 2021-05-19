import Head from 'next/head'
import { AppWrapper } from '~/components/context/AppContext'

import '../styles/base.css'
import '../styles/fonts.css'
import '../styles/global.css'

function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"></meta>
        <meta http-equiv="Content-Language" content="pt-br"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Head>
        <link
          rel="preload"
          href="/fonts/futura-light-bt.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/futura-medium-bt.ttf"
          as="font"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default App
