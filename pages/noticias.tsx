import xw from 'xwind'
import Layout from '~/components/Layout'

const imgPath = '/imgs/blog'

const almaIframe = 'http://www.youtube.com/embed/HbrLOBwNqA4'

const data = {
  items: [
    {
      title: 'Bertolucci em Milão 2019',
      text:
        '<p>B de Brasil, sim. E com D (de design)</p><p>Em dezembro do ano passado, seis estúdios de design, de todo o território nacional, foram desafiados pela fabricante Bertolucci, pela produtora de componentes e sistemas luminotécnicos Brilia e pelo Centro de Educação Belas Artes, a refletir sobre uma questão central: o que, nos dias de hoje, poderia ser tomado como genuinamente brasileiro, em um segmento tão ligado à tecnologia quanto o desenho de luminárias? Materializada nesta coleção, a resposta, mais do que surpreender, encanta. E renova nossa percepção de que, a parte qualquer conjuntura adversa, nosso “fazer” design continua vivo e atuante. Afinal, se no contexto global, o que credencia um produto é sua performance e grau de inovação; não é menos verdade que é sua expressividade que o identifica aos olhos do mundo. E, nestes quesitos, as brasileiríssimas luminárias B de Brasil têm muito a contar.</p>',
      imgs: [
        `${imgPath}/Lopez-Ratana-11042019-00009.jpg`,
        // `${imgPath}/Lopez-Ratana-11042019-00003.jpg`,
        // `${imgPath}/bertolucci_fabrica_aberta_dw-5.jpg`,
      ],
    },
    {
      title: 'A linha "Alma"',
      text:
        '<p>Formas antigas de vidros soprados artesanalmente utilizados individualmente ou em sobreposições com várias combinações diferentes. Possuem como elemento de identidade a cortiça natural. O resgate da memória aplicado no design contemporâneo. Design: Guto Requena</p>',
      imgs: [`${imgPath}/bertolucci_alma_guto_requena_fabrica-_21_.jpg`],
      videos: [almaIframe],
    },
    {
      title: 'Bertolucci Fábrica Aberta no DW!',
      text:
        '<p>Na 2ª edição do Design Weekend, maior festival de design da América Latina, que acontece de 15 a 18 de agosto, em São Paulo...</p>',
      imgs: [
        `${imgPath}/bertolucci_fabrica_aberta_dw-5.jpg`,
        `${imgPath}/Lopez-Ratana-11042019-00003.jpg`,
      ],
    },
    {
      title: 'A linha "Alma"',
      text:
        '<p>Formas antigas de vidros soprados artesanalmente utilizados individualmente ou em sobreposições com várias combinações diferentes. Possuem como elemento de identidade a cortiça natural. O resgate da memória aplicado no design contemporâneo. Design: Guto Requena</p>',
      imgs: [`${imgPath}/bertolucci_alma_guto_requena_fabrica-_21_.jpg`],
      videos: [almaIframe],
    },
    {
      title: 'Bertolucci em Milão 2019',
      text:
        '<p>B de Brasil, sim. E com D (de design)</p><p>Em dezembro do ano passado, seis estúdios de design, de todo o território nacional, foram desafiados pela fabricante Bertolucci, pela produtora de componentes e sistemas luminotécnicos Brilia e pelo Centro de Educação Belas Artes, a refletir sobre uma questão central: o que, nos dias de hoje, poderia ser tomado como genuinamente brasileiro, em um segmento tão ligado à tecnologia quanto o desenho de luminárias?</p>',
      imgs: [
        `${imgPath}/Lopez-Ratana-11042019-00009.jpg`,
        `${imgPath}/Lopez-Ratana-11042019-00003.jpg`,
      ],
    },
    {
      title: 'A linha "Alma"',
      text:
        '<p>Formas antigas de vidros soprados artesanalmente utilizados individualmente ou em sobreposições com várias combinações diferentes. Possuem como elemento de identidade a cortiça natural. O resgate da memória aplicado no design contemporâneo. Design: Guto Requena</p>',
      imgs: [`${imgPath}/bertolucci_alma_guto_requena_fabrica-_21_.jpg`],
      videos: [almaIframe],
    },
  ],
}

const selected = data.items[0]

const Blog = () => {
  return (
    <Layout>
      <div css={xw`col-start-2`}>
        <div css={xw`mb-36 grid grid-cols-3 gap-x-20 items-start`}>
          <ul css={xw`grid grid-cols-2 gap-4`}>
            {data.items.map((item, i) => (
              <li key={i} css={xw`opacity-50`}>
                <a>
                  <img src={item.imgs[0]} alt="" />
                  <h2>{item.title}</h2>
                </a>
              </li>
            ))}
          </ul>

          <div css={xw`col-span-2`}>
            <ul>
              {selected.imgs.map((img, i) => (
                <li key={i}>
                  <img src={img} alt="" />
                </li>
              ))}
            </ul>

            <h3 css={xw`font-medium my-4`}>{selected.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: selected.text }}></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
