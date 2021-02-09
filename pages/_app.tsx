import Head from 'next/head'
import { Global } from '@emotion/react'
import xw from 'xwind'

import '../styles/global.css'
import '../styles/base.css'

function App({ Component, pageProps }) {
  return (
    <>
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
      <Global
        //keyframes + ring and shadow classes variables  ... to global styles
        styles={xw`XWIND_BASE XWIND_GLOBAL`}
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
