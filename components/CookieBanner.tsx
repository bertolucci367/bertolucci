import xw from 'xwind'

const CookieBanner = () => {
  return (
    <div
      css={[
        xw`
            fixed left-4 right-4 bottom-4
            bg-white bg-opacity-90 py-4 px-6
          `,
        `
          @keyframes example {
            from {bottom: -300px}
            to {bottom: 1rem }
          }

          animation-name: example;
          animation-duration: 1s;
          `,
      ]}
    >
      <div css={xw`flex flex-wrap lg:flex-nowrap`}>
        <div>
          Usamos cookies para armazenar informações sobre como você usa o nosso
          site e as páginas que visita. Tudo para tornar sua experiênica a mais
          agradável possível. Para entender os tipos de cookies que utilizamos,
          click em{' '}
          <a href="/politica-de-cookies" css={xw`font-medium`}>
            Definições dos Cookies
          </a>
          . Ao clicar em <strong>Concordo</strong>, você consente a utilização
          dos cookies.
        </div>
        <div css={xw`flex flex-col font-medium mt-4 lg:mt-0 lg:ml-8 lg:w-2/12`}>
          <a href="">Concordo</a>
          <a href="/politica-de-cookies" css={xw`whitespace-nowrap mt-2`}>
            Definições dos Cookies
          </a>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
