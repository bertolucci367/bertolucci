import xw from 'xwind'
import Layout from '~/components/Layout'
import Carousel from '~/components/Carousel'
import { GraphQLClient } from 'graphql-request'
import { BlogQuery } from '~/graphcms/index'

const Blog = ({ data }) => {
  const images = data.assets.map((img: any) => (
    <img src={img.url} height={img.height} width={img.width} alt={img.alt} />
  ))

  return (
    <Layout>
      <div css={xw`col-start-2`}>
        <Carousel slides={images} nav close={'/blog'}>
          <div>
            <h1>{data.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.texto?.html,
              }}
            ></div>
          </div>
        </Carousel>
      </div>
    </Layout>
  )
}

const query = `

`

export async function getStaticProps({ params, preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { slug } = params
  const { values } = await gcms.request(BlogQuery, { id: slug })

  if (!values) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: values,
    }, // will be passed to the page component as props
  }
}

const _paths = `
query Blogs {
  values: blogs(where: {NOT: {slug: "null"}}) {
    slug
  }
}
`

export async function getStaticPaths() {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)
  const { values } = await gcms.request(_paths)

  // Get the paths we want to pre-render based on posts
  const paths = []

  values.forEach((el: any) => paths.push({ params: { slug: el.slug } }))

  return { paths, fallback: false }
}

export default Blog
