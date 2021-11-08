import LayoutProduct from '~/components/LayoutProduct'
import List from '~/components/products/List'
import { useEffect } from 'react'
import { useAppContext } from '~/components/context/AppContext'
import { useRouter } from 'next/router'
import { gcms } from '~/services/gcms'

const Search = ({ products }) => {
  const router = useRouter()
  const shared = useAppContext()

  useEffect(() => {
    shared.addData({
      goToLines: false,
      productClosePath: `/produtos/busca/${router.query.q}`,
    })
  }, [])

  return (
    <LayoutProduct search={router.query.q as string}>
      {products.length === 0 && (
        <h2 className={`font-medium text-center text-14px my-10`}>
          Desculpe, mas não encontramos nenhum produto.
        </h2>
      )}
      <List products={products} show />
    </LayoutProduct>
  )
}

export async function getServerSideProps({ params }) {
  const { values } = await gcms.request(
    `
  query Search($id: String!) {
    values: products(where: { OR: [{name_contains: $id}, {slug_contains: $id}] }, stage: PUBLISHED) {
      id
      name
      code
      slug
      designer {
        name
      }
      photo {
        handle
        height
        width
        alt
      }
      lines {
        id
        slug
        name
      }
    }
  }
  `,
    { id: params.q },
  )

  return {
    props: { products: values }, // will be passed to the page component as props
  }
}

export default Search
