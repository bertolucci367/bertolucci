import xw from 'xwind'
import styled from '@emotion/styled'

import React, { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'
import Card from './Card'

const ListUL = styled.ul(
  xw`
  col-start-1 col-end-4 lg:col-start-2 lg:col-end-3
  flex flex-wrap justify-center
  lg:justify-center

  `,
)

const List = ({ items = [], products = [], ...args }) => {
  const router = useRouter()
  const shared = useAppContext()

  const listItems = items.map(({ products, ...rest }, i) => {
    const [product] = products

    if (!product) return

    return <Card key={product.slug} product={product} {...args} />
  })

  const listProducts = products.map(product => (
    <Card key={product.slug} product={product} {...args} />
  ))

  return (
    <ListUL>
      {listItems}
      {listProducts}
    </ListUL>
  )
}

export default List
