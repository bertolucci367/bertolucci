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
      url
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
        }
      }
    }
  }
}
`

export const ProfileQuery = `
query Profile($id: ID!) {
  values: person (where: { id: $id }, stage: PUBLISHED) {
    id
		email
		name
		newsletter
		phone
    company
    seller {
      id
      name
    }
  }
}
`

export const CreatePersonQuery = `
mutation createPerson($input: PersonCreateInput!) {
  createPerson(data: $input) {
    id
  }
}
`

export const UpdatePersonQuery = `
mutation($id: ID!, $input: PersonUpdateInput!) {
  updatePerson(
    where: { id: $id },
    data: $input
  ) {
    id
  }
}
`

export const PublishPersonQuery = `
mutation publishPerson($id: ID!) {
  publishPerson(where: { id: $id }, to: PUBLISHED) {
    id
  }
}
`

export const PersonByEmailQuery = `
query Person($email: String!) {
  values: person (where: { email: $email }, stage: PUBLISHED) {
    email
    password
    name
    id
  }
}
`

export const CatalogQuery = `
query Catalogs {
  values: catalogos(stage: PUBLISHED, orderBy: updatedAt_DESC, first: 1) {
    id
    name
    updatedAt
    photo {
      handle
      height
      width
      alt
      url
    }
    file {
      id
      handle
      height
      width
      alt
      url
    }
  }
}
`

export const ConsultantsByUser = `
query ConsultantByUser($id: ID!) {
  values: person(where: {id: $id}, stage: PUBLISHED) {
    seller {
      email
      name
      phone
      id
    }
  }
}
`

export const UpdateUserQuery = `
mutation($id: ID!, $input: PersonUpdateInput!) {
  updatePerson(
    where: { id: $id },
    data: $input
  ) {
    id
  }
}
`
