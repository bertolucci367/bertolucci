import { GraphQLClient } from 'graphql-request'
import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useAppContext } from '~/components/context/AppContext'

const Designer = ({ designer, products }) => {
  const shared = useAppContext()

  shared.goToLines = false
  shared.productClosePath = `/produtos/designers/${designer.slug}`

  return (
    <LayoutProduct designer={designer}>
      <List products={products} show />
    </LayoutProduct>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://bertolucci.com.br/api/items/designers/filter/${params.slug}.json`,
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

export default Designer
