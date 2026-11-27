import Layout from '~/components/Layout'

const collectionItems = [
  {
    src: '/imgs/home/produtos/forma.png',
    alt: 'Forma — Triplex Arquitetura',
  },
  {
    src: '/imgs/home/produtos/campanula.png',
    alt: 'Campânula — Oficina Bertolucci',
  },
  {
    src: '/imgs/home/produtos/ourive.png',
    alt: 'Ourive — Clément Gérard',
  },
  {
    src: '/imgs/home/produtos/torre.png',
    alt: 'Torre — Carol Gay',
  },
  {
    src: '/imgs/home/produtos/mani.png',
    alt: 'Maní — Ohtake',
  },
  {
    src: '/imgs/home/produtos/balaio.png',
    alt: 'Balaio — Oficina Bertolucci',
  },
  {
    src: '/imgs/home/produtos/forma-2.png',
    alt: 'Forma — Triplex Arquitetura',
  },
  {
    src: '/imgs/home/produtos/nefi.png',
    alt: 'Nefi — Juliana Bertolucci',
  },
  {
    src: '/imgs/home/produtos/dobras.png',
    alt: 'Dobras — Camila Sarpi',
  },
  {
    src: '/imgs/home/produtos/torre-2.png',
    alt: 'Torre — Carol Gay',
  },
  {
    src: '/imgs/home/produtos/ma.png',
    alt: 'Ma — Rogério Shinagawa',
  },
  {
    src: '/imgs/home/produtos/brass.png',
    alt: 'Brass — Marina Linhares',
  },
]

const Index = () => {
  return (
    <Layout>
      <main
        className="col-start-1 col-end-[-1] row-start-2 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/imgs/home/bg-home.jpeg')" }}
      >
        <section aria-label="Coleção Bertolucci 70 anos">
          <picture>
            <source
              media="(max-width: 1023px)"
              srcSet="/imgs/home/cover-mobile.jpeg"
            />
            <img
              src="/imgs/home/cover-desktop.jpeg"
              alt="Bertolucci — Coleção 70 anos"
              className="block h-auto w-full"
            />
          </picture>
        </section>

        <section
          aria-label="Itens da coleção"
          className="grid grid-cols-1 gap-6 px-4 py-8 md:grid-cols-2 lg:gap-8 lg:px-10 lg:py-12"
        >
          {collectionItems.map((item) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className="block h-auto w-full"
              loading="lazy"
            />
          ))}
        </section>
      </main>
    </Layout>
  )
}

export default Index
