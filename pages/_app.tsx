import Head from 'next/head'
import { AppWrapper } from '~/components/context/AppContext'
import { Provider } from 'next-auth/client'

import '../styles/fonts.css'
import '../styles/global.css'
import '../styles/tailwind.base.css'

function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"></meta>
        <meta httpEquiv="Content-Language" content="pt-br"></meta>
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
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </AppWrapper>
  )
}

export default App
