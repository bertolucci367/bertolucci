import Layout from '~/components/Layout'
import { GraphQLClient } from 'graphql-request'
import { DesignersQuery } from '~/graphcms/index'
import { ListUL } from '~/components/products/List'
import Card from '~/components/Card'

const Designers = ({ designers }) => {
  return (
    <Layout title="designers">
      <ListUL>
        {designers.map(d => (
          <Card
            key={d.slug}
            photo={d.photo}
            path={`/designers/${d.slug}`}
            title={d.name}
          ></Card>
        ))}
      </ListUL>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(DesignersQuery)

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      designers: values,
    }, // will be passed to the page component as props
  }
}

const _paths = `
query Designers {
  values: designers(where: {NOT: {slug: "null"}}) {
    id
    slug
  }
}
`

export default Designers
