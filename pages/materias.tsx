import { GraphQLClient } from 'graphql-request'

const MaterialsIndex = () => null

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=86400',
  )

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
  }
}

export default MaterialsIndex
