import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useRouter } from 'next/router'
import xw from 'xwind'

const Search = ({ products }) => {
  const router = useRouter()
  return (
    <LayoutProduct search={router.query.q as string}>
      {products.length === 0 && (
        <h2 css={xw`font-medium text-center text-14px my-10`}>
          Desculpe, mas não encontramos nenhum produto.
        </h2>
      )}
      <List products={products} show />
    </LayoutProduct>
  )
}

export async function getServerSideProps({ params }) {
  const host = 'http://bertolucci.com.br/api/produtos/search.json'
  const res = await fetch(`${host}?q=${params.q}`)
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

export default Search
