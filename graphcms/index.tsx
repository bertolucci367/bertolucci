const fields = {
  product: `
    name
    code
    slug
    designer {
      name
    }
    cover {
      id
      handle
      height
      width
      alt
      url(transformation: {image: {resize: {width: 300, height: 300, fit: crop}}})
    }
    photo {
      id
      handle
      height
      width
      alt
      url(transformation: {image: {resize: {width: 300, height: 300, fit: crop}}})
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
    name
    products {
      ${fields.product}
    }
  }
}
`

export const LineQuery = `
query Line($id: String!) {
  values: line (where: { slug: $id}, stage: PUBLISHED) {
    id
    stage
    updatedAt
    createdAt
    name
    products {
      ${fields.product}
    }
  }
}
`

export const DesignersQuery = `
query Designers {
  values: designers {
    id
    slug
    name
    photo {
      handle
      height
      width
      alt
      url(transformation: {image: {resize: {width: 300, height: 300, fit: crop}}})
    }
  }
}
`

export const DesignerQuery = `
query Designer($id: String!) {
  values: designer (where: { slug: $id}) {
    id
    slug
    name
    description {
      html
    }
    photo {
      handle
      height
      width
      alt
      url(transformation: {image: {resize: {width: 300, height: 300, fit: crop}}})
    }
    products {
      ${fields.product}
    }
  }
}
`

export const TypologyQuery = `
query typology($id: String!) {
  values: typology (where: { slug: $id }) {
    id
    stage
    updatedAt
    createdAt
    name
    products {
      ${fields.product}
    }
  }
}
`

export const BlogQuery = `
query Blog($id: String!) {
  values: blog (where: { slug: $id}, stage: PUBLISHED) {

    id
    stage
    updatedAt
    assets(first: 500) {
      id
      stage
      handle
      height
      width
      alt
      url(transformation: {image: {resize: {width: 300, height: 300, fit: crop}}})
    }
    createdAt
    id
    publishedAt
    slug
    texto {
      html
    }
    title
    updatedAt
    videos

  }

}
`

export const BlogPageQuery = `
query BlogoPage {
  data: page(where: {slug: "blog"}) {
    items {
      ... on  Blog{
        __typename
        id
        title
        slug
				assets(first: 1) {
          handle
          height
          width
          alt
          url(transformation: {image: {resize: {width: 300, height: 300, fit: crop}}})
        }
      }
    }
  }
}
`
