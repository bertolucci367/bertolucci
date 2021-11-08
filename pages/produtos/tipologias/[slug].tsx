import { gcms } from '~/services/gcms'
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
  }
}

export async function getStaticPaths() {
  const { values } = await gcms.request(`
    query tipologias {
      values: typologies(where: {NOT: {slug: "null"}}) {
        slug
      }
    }
  `)

  // Get the paths we want to pre-render based on posts
  const paths = values.map(el => ({ params: { slug: el.slug } }))

  return { paths, fallback: false }
}

export default Typology
