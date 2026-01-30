import Document, { Html, Head, Main, NextScript } from 'next/document'

class BertolucciDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="icon" type="image/jpeg" href="/favicon.jpeg" />
          <link rel="apple-touch-icon" href="/favicon.jpeg" />
          <meta name="theme-color" content="#000000" />
          {/* PNG and Apple specific icons can be added when files exist */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              var _gaq = _gaq || [];
              _gaq.push(['_setAccount', 'UA-32925919-1']);
              _gaq.push(['_trackPageview']);

              (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
              })();
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default BertolucciDocument
