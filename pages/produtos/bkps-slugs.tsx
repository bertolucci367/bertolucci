import { GraphQLClient } from 'graphql-request'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'

const Lines = ({ products }) => {
  return <LayoutProduct>{/* <List products={products} /> */}</LayoutProduct>
}

const graph = {
  materiais: (name) => {
    return `
    {
      products(where: { materials_some: { name: "${name}" } })  {
        id
        name
        materials {
          name
          id
        }
      }
    }
    `
  },
  linhas: (name) => {
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

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { slug } = params

  const sql = graph[slug[0]](slug[1])
  const { products } = await gcms.request(sql)

  for (let i = 100, l = 103; i < l; i++) {
    products.push({ id: i, name: `Product ${i}`, design: `oficina bertolucci` })
  }

  return {
    props: { products, preview },
  }
}

export async function getStaticPaths() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  console.log('blah')

  const { materials, lines } = await gcms.request(
    `
    {
      materials {
        name
        id
      }

      lines {
        id
        name
      }
    }
    `,
  )

  const res = []
  const setParams = (name: string, items: any) => {
    return items.map((item) => {
      res.push({
        params: {
          slug: [name, item.name],
        },
      })
    })
  }

  setParams('materiais', materials)
  setParams('linhas', lines)
  setParams('tipologias', lines)

  return {
    paths: res,
    fallback: false,
  }
}

export default Lines
