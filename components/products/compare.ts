export const add = ({ product, shared }) => {
  const res = [...shared.compare]
  const idx = res.findIndex((o) => o.slug === product.slug)

  const { slug, code, name } = product

  if (idx === -1) {
    res.push({ slug, code, name })
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

export const has = ({ shared, product }) => {
  return !!shared.compare.find((o) => o.slug === product.slug)
}
