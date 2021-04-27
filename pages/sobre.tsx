import xw from 'xwind'
import Layout from '~/components/Layout'

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

const About = () => {
  return (
    <Layout>
      <div css={xw`col-start-2`}>
        <div css={xw`grid grid-cols-4 gap-10 mb-36`}>
          <div css={xw`w-10/12 col-span-1`}>
            <div css={xw`sticky top-36`}>
              <h2 css={xw`text-18px mb-6`}>
                Paulistana na origem mas brasileira de alma, uma empresa em
                movimento
              </h2>
              <p>
                Início de 1956. Nossa pequena metalúrgica, com poucos
                funcionários, abre suas portas no bairro da Lapa, zona oeste de
                São Paulo. O nome, sugestão da matriarca Dona Odette, é adotado
                em homenagem à família de seu marido e fundador, Walter
                Bertolucci.
              </p>
              <p>
                Atualmente na segunda geração com Eneida Bertolucci no comando e
                revigorados, estamos ainda hoje instalados no local de nossa
                fundação. Investimos no design brasileiro e somos avessos ao
                discurso das tendências fatores que, creditamos continuarmos à
                frente e sendo uma das empresas de iluminação mais respeitadas
                do Brasil. Acreditamos nas pessoas, no preparo e na permanente
                atualização de nossos profissionais.
              </p>
            </div>
          </div>

          <ol css={xw`col-span-3 grid grid-cols-3 gap-10`}>
            <ol css={xw`col-span-3 grid grid-cols-3 gap-10`}>
              {data.history.imgs.map((url, i) => (
                <li key={i} css={xw`relative`}>
                  <img src={url} alt="" />
                </li>
              ))}
            </ol>
          </ol>
        </div>

        <div css={xw`grid grid-cols-4 gap-10 mb-36`}>
          <div css={xw`w-10/12`}>
            <div css={xw`sticky top-36`}>
              <h2 css={xw`text-18px mb-6`}>
                Com o requinte da produção semi-artesanal
              </h2>
              <p>
                A Bertolucci possui quase 60 anos de tradição fabril, dominando
                todo o processo produtivo de suas luminárias: do conceito
                inicial ao projeto. Da montagem do protótipo à sua fabricação.
                Sem esquecer, claro, de sua comercialização.
              </p>
              <p>
                Além disso, entre as empresas do segmento, é a única a contar
                com design 100% nacional, produzido “in situ”. “Produzir em casa
                amplia nossas possibilidades. Se estamos com dificuldades em
                visualizar uma ideia, tudo o que temos de fazer é desenvolver o
                ferramental para materializá-la.”, declara Eneida Bertolucci,
                que na melhor tradição italiana, aponta a atenção aos detalhes
                como outro dos pontos fortes da empresa. “Um requinte de
                acabamento que só a produção semi-artesanal permite.”, pontua.
              </p>
            </div>
          </div>

          <ol css={xw`col-span-3 grid grid-cols-3 gap-10`}>
            {data.production.imgs.map((url, i) => (
              <li key={i}>
                <img src={url} alt="" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

export default About
