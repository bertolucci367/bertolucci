import Layout from '~/components/Layout'
import { gcms } from '~/services/gcms'

const BasicPage = ({ data }) => {
  const { seo } = data
  return (
    <Layout title={seo?.title} description={seo?.description}>
      <div className="grid-in-main mb-20 ckeditor">
        <div
          className="2xl:max-w-7xl 2xl:mx-auto"
          dangerouslySetInnerHTML={{ __html: data.body.html }}
        ></div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { values } = await gcms.request(`
    query BasicPage {
      values: basicPages (
          stage: PUBLISHED,
        ) {
          slug
        }
    }
  `)

  // Get the paths we want to pre-render based on posts
  const paths = values.map(el => ({ params: { slug: el.slug } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params, preview = false }) {
  const { values } = await gcms.request(
    `
    query BasicPage($id: String!) {
      values: basicPage(where: { slug: $id}) {
          id
          name
          slug
          body {
            html
          }

          seo {
            title
            description

          }
        }
    }
    `,
    {
      id: params?.slug,
    },
  )

  return {
    props: { data: values, preview },
  }
}

export default BasicPage
