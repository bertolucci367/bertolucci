import { GraphQLClient } from 'graphql-request'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useAppContext } from '~/components/context/AppContext'

const Materials = ({ products }) => {
  const shared = useAppContext()

  return (
    <LayoutProduct>
      <List products={products} />
    </LayoutProduct>
  )
}

const graph = {
  tipologias: (name: string) => {
    return `
    {
      products(where: { lines_some: { name: "${name}" } })  {
        id
        name
      }
    }
    `
  },
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://bertolucci.com.br/api/produtos/materiais/${params.slug}.json`,
  )
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: data, // will be passed to the page component as props
  }
}

// export async function getStaticProps({ params, preview = false }) {
//   const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

//   const { slug } = params

//   const products = []

//   for (let i = 100, l = 107; i < l; i++) {
//     products.push({ id: i, name: `Product ${i}`, design: `oficina bertolucci` })
//   }

//   return {
//     props: { products, preview },
//   }
// }

// export async function getStaticPaths() {
//   const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

//   const typos = [
//     'acrilico',
//     'ceramica',
//     'cortiça',
//     'fibras-naturais',
//     'madeira',
//     'metal',
//     'tecido',
//     'vidro',
//   ]

//   const paths = typos.map((val) => ({
//     params: { slug: val },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

export default Materials
