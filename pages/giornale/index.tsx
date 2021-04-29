import xw from 'xwind'
import Layout from '~/components/Layout'
import { GraphQLClient } from 'graphql-request'
import { BlogPageQuery } from '~/graphcms/index'
import Card from '~/components/Card'
import { ListUL } from '~/components/products/List'

const Blog = ({ data }) => {
  return (
    <Layout>
      <div css={xw`col-start-2`}>
        <div css={xw`mb-36 grid gap-x-20 items-start`}>
          <ListUL>
            {data.map((item, i) => (
              <Card
                key={item.slug}
                photo={item.assets}
                path={`/giornale/${item.slug}`}
                title={item.title}
              ></Card>
            ))}
          </ListUL>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { data } = await gcms.request(BlogPageQuery)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: data.items,
    }, // will be passed to the page component as props
  }
}

const _paths = `
query Blogs {
  values: blogs(where: {NOT: {slug: "null"}}) {
    id
    slug
  }
}
`

export default Blog
