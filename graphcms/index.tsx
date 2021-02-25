const fields = {
  product: `
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
  `,
}

export const ProductsQuery = `
query ProductPage {
  page(where: {slug: "produtos"}) {
    items {
      ... on Line {
        __typename
        id
        name
        products(first: 1) {
          ${fields.product}
        }
      }
    }
  }
}
`

export const MaterialQuery = `
query Material($id: String!) {

  values: material (where: { slug: $id}) {

    id
    stage
    updatedAt
    createdAt
    id
    name
    products {
      ${fields.product}
    }
  }
}
`

export const LineQuery = `
query Line($id: String!) {
  values: line (where: { slug: $id}) {
    id
    stage
    updatedAt
    createdAt
    id
    name
    products {
      ${fields.product}
    }
  }
}
`
