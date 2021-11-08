import { gcms } from '~/services/gcms'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useAppContext } from '~/components/context/AppContext'
import { MaterialQuery } from '~/graphcms/index'

const Materials = ({ values }) => {
  const shared = useAppContext()

  return (
    <LayoutProduct>
      <List products={values.products} />
    </LayoutProduct>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const { slug } = params
  const { values } = await gcms.request(MaterialQuery, { id: slug })

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      values,
    }, // will be passed to the page component as props
  }
}

const _paths = `
query materials {
  values: materials(where: {NOT: {slug: "null"}}) {
    slug
  }
}
`

export async function getStaticPaths() {
  const { values } = await gcms.request(_paths)

  // Get the paths we want to pre-render based on posts
  const paths = values.map(el => ({ params: { slug: el.slug } }))

  return { paths, fallback: false }
}

export default Materials
