import Layout from '~/components/Layout'

const List = ({ items }) => {
  return (
    <ol
      className="grid gap-y-28
              md:grid-cols-2 md:gap-x-4px
              xl:grid-cols-2 xl:col-span-3 xl:gap-x-2.5"
    >
      {items.map((item, i) => (
        <li key={i} className={`relative`}>
          <img src={item.img} alt="" className="mb-4" />
          {item.text.map((text, i) => (
            <p key={i} className="md:pr-10">
              {text}
            </p>
          ))}
        </li>
      ))}
    </ol>
  )
}

const Persona = () => {
  const data = [
    {
      img: '/imgs/persona/Foto_1.jpg',
      text: [
        'Esta coleção foi feita exclusivamente para um hotel de luxo na região de São Paulo.',
        'O desenvolvimento foi integralmente personalizado: desde os protótipos iniciais, aos moldes de fabricação e cortes a laser, até a disponibilização de uma equipe dedicada somente para que esse projeto se concretizasse. O que acharam do resultado?',
      ],
    },
    {
      img: '/imgs/persona/Foto_2.jpg',
      text: [
        'Esta coleção foi feita exclusivamente para um hotel de luxo na região de São Paulo.',
        'O desenvolvimento foi integralmente personalizado: desde os protótipos iniciais, aos moldes de fabricação e cortes a laser, até a disponibilização de uma equipe dedicada somente para que esse projeto se concretizasse. O que acharam do resultado?',
      ],
    },
    {
      img: '/imgs/persona/Foto_3.jpg',
      text: [
        'Neste produto Persona, acolhemos o pedido de cliente em uma combinação singular do braço articulado da arandela Flash unificado ao refletor da arandela Gras.',
        'Diante de nosso catálogo de centenas de produtos e mais de duzentos acabamentos possíveis, basta você libertar a sua criatividade e deixar que a Bertolucci lhe ajude a ter objetos de design personalizados.',
      ],
    },
    {
      img: '/imgs/persona/Foto_4.jpg',
      text: [
        'No caso desse abajur Ibira Persona, a proposta foi trocar o refletor do Ibira para uma cúpula florida do abajur Mix Print.',
        'Vamos desde a mais simples personalização, até o desenvolvimento de uma linha completa feita só para você.',
      ],
    },
  ]

  return (
    <Layout title="persona">
      <div className={`grid-in-main`}>
        <div className={`relative`}>
          <div id="historia" className={`-top-36 absolute left-0`}></div>
          <div
            className={`grid grid-cols-1 xl:grid-cols-4 gap-y-10 xl:gap-10 mb-36`}
          >
            <div className={`xl:w-10/12 xl:col-span-1`}>
              <div className={`sticky top-36`}>
                <h1 className={`text-h1 mt-0`}>Persona</h1>
                <p>
                  Com nossos 65 anos de know-how no desenho e na fabricação de
                  luminárias, além das peças mais do que exclusivas que temos em
                  linha, oferecemos para os nossos clientes a oportunidade de
                  criar peças únicas. Te apresentamos a linha Persona.
                </p>
                <p>
                  A Persona Bertolucci é uma combinação de criatividade, técnica
                  e concretização, que resultam em peças especiais e que atendem
                  todas as expectativas e propostas de cada projeto
                  arquitetônico e de decoração.
                </p>
              </div>
            </div>

            <List items={data} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Persona
