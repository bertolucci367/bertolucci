import xw from 'xwind'
import Layout from '~/components/Layout'

const data = {
  history: {
    imgs: [
      'http://assets1.bertolucci.com.br/uploads/about_entry_images/image/518186a143493b6b0c000004/river_pendentes-antigos.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5181869943493b6b0c000002/river_colunas-abajures.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5181869443493b6b0c000001/river_coluna-com-mulheres.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5181869e43493b6b0c000003/river_pendentes-anos-80.jpg',
      'http://assets1.bertolucci.com.br/uploads/about_entry_images/image/51784a9843493b434d00003b/river_252-ouro_saveforweb.jpg',
    ],
  },

  production: {
    imgs: [
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5178497a43493b435700002d/river_Fabrica-Bertolucci-069.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5178497e43493b6737000008/river_Fabrica-Bertolucci-103.jpg',
      'http://assets1.bertolucci.com.br/uploads/about_entry_images/image/5178498443493b435700002e/river_Fabrica-Bertolucci-139.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5178498843493b6737000009/river_Fabrica-Bertolucci-212.jpg',
      'http://assets1.bertolucci.com.br/uploads/about_entry_images/image/5178498b43493b435700002f/river_Fabrica-Bertolucci-247.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5178499043493b434d000036/river_Fabrica-Bertolucci-316.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/5178499443493b4357000030/river_Fabrica-Bertolucci-329.jpg',
      'http://assets1.bertolucci.com.br/uploads/about_entry_images/image/5178499a43493b434d000037/river_Fabrica-Bertolucci-358.jpg',
      'http://assets1.bertolucci.com.br/uploads/about_entry_images/image/517849a043493b434d000038/river_Fabrica-Bertolucci-371.jpg',
      'http://assets1.bertolucci.com.br/uploads/about_entry_images/image/517849a443493b673700000a/river_Fabrica-Bertolucci-457.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/517849a843493b434d000039/river_Fabrica-Bertolucci-468.jpg',
      'http://assets2.bertolucci.com.br/uploads/about_entry_images/image/517849ab43493b673700000b/river_Fabrica-Bertolucci-504.jpg',
    ],
  },
}

const About = () => {
  return (
    <Layout>
      <div css={xw`col-start-2`}>
        {/* <h1>Sobre</h1> */}

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
                <li key={i}>
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
