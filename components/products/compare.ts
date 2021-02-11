export const add = ({ product, shared }) => {
  const res = [...shared.compare]
  const idx = res.findIndex((o) => o.slug === product.slug)

  if (idx === -1) {
    res.push(product)
  }

  shared.addData({ compare: res })
}

export const remove = ({ product, shared }) => {
  const res = [...shared.compare]
  const idx = res.findIndex((o) => o.slug === product.slug)

  if (idx >= 0) {
    res.splice(idx, 1)
  }
  shared.addData({ compare: res })
}
