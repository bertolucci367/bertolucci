import Card from './Card'

export const ListUL = `
    flex flex-wrap justify-center
    lg:justify-center
  `

const List = ({ items = [], products = [], ...args }) => {
  const listItems = items.map(({ products, ...rest }, i) => {
    const [product] = products

    if (!product) return

    return <Card key={product.slug} product={product} {...args} />
  })

  const listProducts = products.map(product => (
    <Card key={product.slug} product={product} {...args} />
  ))

  return (
    <ul className={ListUL}>
      {listItems}
      {listProducts}
    </ul>
  )
}

export default List
