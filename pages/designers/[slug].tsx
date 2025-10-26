import { GraphQLClient } from 'graphql-request'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useAppContext } from '~/components/context/AppContext'
import { useEffect } from 'react'
import { DesignerQuery } from '~/graphcms/index'

const Designer = ({ designer, products }) => {
  const shared = useAppContext()

  useEffect(() => {
    shared.addData({
      goToLines: false,
      productClosePath: `/designers/${designer.slug}`,
    })
  }, [designer.slug])

  return (
    <LayoutProduct designer={designer} title={designer.name}>
      <List products={products} show />
    </LayoutProduct>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { slug } = params
  const { values } = await gcms.request(DesignerQuery, { id: slug })

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      designer: values,
      products: values.products,
    }, // will be passed to the page component as props
    revalidate: 86400, // Revalidate every 24 hours
  }
}

const _paths = `
query Designers {
  values: designers(where: {NOT: {slug: "null"}}) {
    id
    slug
  }
}
`

export async function getStaticPaths() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(_paths)

  // Get the paths we want to pre-render based on posts
  const paths = values.map(el => ({ params: { slug: el.slug } }))

  return { paths, fallback: 'blocking' }
}

export default Designer
