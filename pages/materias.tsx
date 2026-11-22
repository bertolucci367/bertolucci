import { GraphQLClient } from 'graphql-request'

const MaterialsIndex = () => null

export async function getStaticProps() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(`
    query FirstMaterial {
      values: materials(
        where: { NOT: { slug: "null" } }
        orderBy: name_ASC
        first: 1
      ) {
        slug
      }
    }
  `)

  if (!values?.length) {
    return { notFound: true }
  }

  return {
    redirect: {
      destination: `/produtos/materiais/${values[0].slug}`,
      permanent: false,
    },
    revalidate: 86400,
  }
}

export default MaterialsIndex
