import Card from './Card'

export const ListUL = `
    flex flex-wrap justify-center
    lg:justify-center
  `

const List = ({ items = [], products = [], ...args }) => {
  const listItems = items.map(({ products, ...rest }, i) => {
    const [product] = products

    if (!product) return

    return (
      <Card key={product.slug} product={product} priority={i < 6} {...args} />
    )
  })

  const listProducts = products.map((product, i) => (
    <Card
      key={product.slug}
      product={product}
      priority={items.length === 0 && i < 6}
      {...args}
    />
  ))

  return (
    <ul className={ListUL}>
      {listItems}
      {listProducts}
    </ul>
  )
}

export default List
