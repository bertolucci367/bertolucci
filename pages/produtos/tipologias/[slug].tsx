import { GraphQLClient } from 'graphql-request'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { TypologyQuery } from '~/graphcms/index'

const Typology = ({ products }) => {
  return (
    <LayoutProduct>
      <List products={products} />
    </LayoutProduct>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { slug } = params
  const { values } = await gcms.request(TypologyQuery, { id: slug })

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products: values.products,
    }, // will be passed to the page component as props
    revalidate: 86400, // Revalidate every 24 hours
  }
}

export async function getStaticPaths() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(`
    query tipologias {
      values: typologies(where: {NOT: {slug: "null"}}) {
        slug
      }
    }
  `)

  // Get the paths we want to pre-render based on posts
  const paths = values.map(el => ({ params: { slug: el.slug } }))

  return { paths, fallback: 'blocking' }
}

export default Typology
