import Layout from '~/components/Layout'

const List = ({ items }) => {
  return (
    <ol
      className="grid gap-y-28
              md:grid-cols-2 md:gap-x-4px
              xl:grid-cols-2 xl:col-span-3 xl:gap-x-2.5"
    >
      {items.map((url, i) => (
        <li key={i} className={`relative`}>
          <img src={url} alt="" />
        </li>
      ))}
    </ol>
  )
}

const About = () => {
  const data = {
    history: {
      imgs: [
        '/imgs/about/pendentes-antigos.jpg',
        '/imgs/about/colunas-abajures.jpg',
        '/imgs/about/coluna-com-mulheres.jpg',
        '/imgs/about/pendentes-anos-80.jpg',
        '/imgs/about/252-ouro_saveforweb.jpg',
      ],
    },

    production: {
      imgs: [
        '/imgs/about/Fabrica-Bertolucci-069.jpg',
        '/imgs/about/Fabrica-Bertolucci-103.jpg',
        '/imgs/about/Fabrica-Bertolucci-139.jpg',
        '/imgs/about/Fabrica-Bertolucci-212.jpg',
        '/imgs/about/Fabrica-Bertolucci-247.jpg',
        '/imgs/about/Fabrica-Bertolucci-316.jpg',
        '/imgs/about/Fabrica-Bertolucci-329.jpg',
        '/imgs/about/Fabrica-Bertolucci-358.jpg',
        '/imgs/about/Fabrica-Bertolucci-371.jpg',
        '/imgs/about/Fabrica-Bertolucci-457.jpg',
        '/imgs/about/Fabrica-Bertolucci-468.jpg',
        '/imgs/about/Fabrica-Bertolucci-504.jpg',
      ],
    },
  }

  return (
    <Layout title="a fábrica">
      <div className={`grid-in-main`}>
        <div className={`relative`}>
          <div id="historia" className={`-top-36 absolute left-0`}></div>
          <div
            className={`grid grid-cols-1 xl:grid-cols-4 gap-y-10 xl:gap-10 mb-36`}
          >
            <div className={`xl:w-10/12 xl:col-span-1`}>
              <div className={`sticky top-36`}>
                <h2 className={`text-18px mb-6`}>
                  Paulistana na origem mas brasileira de alma, uma empresa em
                  movimento
                </h2>
                <p>
                  Início de 1956. Nossa pequena metalúrgica, com poucos
                  funcionários, abre suas portas no bairro da Lapa, zona oeste
                  de São Paulo. O nome, sugestão da matriarca Dona Odette, é
                  adotado em homenagem à família de seu marido e fundador,
                  Walter Bertolucci.
                </p>
                <p>
                  Atualmente na segunda geração com Eneida Bertolucci no comando
                  e revigorados, estamos ainda hoje instalados no local de nossa
                  fundação. Investimos no design brasileiro e somos avessos ao
                  discurso das tendências fatores que, creditamos continuarmos à
                  frente e sendo uma das empresas de iluminação mais respeitadas
                  do Brasil. Acreditamos nas pessoas, no preparo e na permanente
                  atualização de nossos profissionais.
                </p>
              </div>
            </div>

            {/*  */}
            <List items={data.history.imgs} />
          </div>
        </div>

        <div className={`relative`}>
          <div id="producao" className={`-top-36 absolute left-0`}></div>
          <div className={`grid xl:grid-cols-4 gap-y-10 xl:gap-10 mb-36`}>
            <div className={`xl:w-10/12`}>
              <div className={`sticky top-36`}>
                <h2 className={`text-18px mb-6`}>
                  Com o requinte da produção semi-artesanal
                </h2>
                <p>
                  A Bertolucci possui quase 60 anos de tradição fabril,
                  dominando todo o processo produtivo de suas luminárias: do
                  conceito inicial ao projeto. Da montagem do protótipo à sua
                  fabricação. Sem esquecer, claro, de sua comercialização.
                </p>
                <p>
                  Além disso, entre as empresas do segmento, é a única a contar
                  com design 100% nacional, produzido “in situ”. “Produzir em
                  casa amplia nossas possibilidades. Se estamos com dificuldades
                  em visualizar uma ideia, tudo o que temos de fazer é
                  desenvolver o ferramental para materializá-la.”, declara
                  Eneida Bertolucci, que na melhor tradição italiana, aponta a
                  atenção aos detalhes como outro dos pontos fortes da empresa.
                  “Um requinte de acabamento que só a produção semi-artesanal
                  permite.”, pontua.
                </p>
              </div>
            </div>

            <List items={data.production.imgs} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
