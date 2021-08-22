import Layout from '~/components/Layout'

function PrivacyPolicy() {
  return (
    <Layout title="Política de Privacidade">
      <div className="grid-in-main mb-20">
        <h1>Política de Privacidade</h1>

        <h2>A sua privacidade é importante para nós. </h2>
        <p>
          É política do Bertolucci respeitar a sua privacidade em relação a
          qualquer informação sua que possamos coletar no site da Bertolucci e
          outras mídias que possuímos e operamos.
        </p>
        <p>
          Solicitamos informações pessoais apenas quando realmente precisamos
          delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
          legais, com o seu conhecimento e consentimento. Também informamos por
          que estamos coletando e como será usado. Apenas retemos as informações
          coletadas pelo tempo necessário para fornecer o serviço solicitado.
          Quando armazenamos dados, protegemos dentro de meios comercialmente
          aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação,
          cópia, uso ou modificação não autorizados.
        </p>
        <p>
          Não compartilhamos informações de identificação pessoal publicamente
          ou com terceiros, exceto quando exigido por lei. O nosso site pode ter
          links para sites externos que não são operados por nós. Esteja ciente
          de que não temos controle sobre o conteúdo e práticas desses sites e
          não podemos aceitar responsabilidade por suas respectivas políticas de
          privacidade.
        </p>
        <p>
          Você é livre para recusar a nossa solicitação de informações pessoais,
          entendendo que talvez não possamos fornecer alguns dos serviços
          desejados.
        </p>
        <p>
          O uso continuado de nosso site será considerado como aceitação de
          nossas práticas em torno de privacidade e informações pessoais. Se
          você tiver alguma dúvida sobre como lidamos com dados do usuário e
          informações pessoais, entre em contacto conosco.
        </p>

        <h2>Cookies</h2>
        <p>
          Veja mais na seção de{' '}
          <a href="/politica-de-cookies">política de cookies</a>.
        </p>

        <h2>Mais informações </h2>

        <p>
          Esperemos que esteja esclarecido e, como mencionado anteriormente, se
          houver algo que você não tem certeza se precisa ou não, geralmente é
          mais seguro deixar os cookies ativados, caso interaja com um dos
          recursos que você usa em nosso site.
        </p>

        <p>Esta política é efetiva a partir de Outubro/2020.</p>
      </div>
    </Layout>
  )
}

export default PrivacyPolicy
