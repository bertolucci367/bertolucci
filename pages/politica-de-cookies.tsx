import Layout from '~/components/Layout'
import xw from 'xwind'
import { GraphQLClient } from 'graphql-request'

const Policy = ({ data }) => {
  return (
    <Layout showCookie={false}>
      <div css={[xw`col-start-2`, `p { margin: 10px 0; }`]}>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.page?.html,
          }}
        ></div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  const { values } = await gcms.request(
    `
    query cookie {
      values: cookiePolicies(first: 1, orderBy: createdAt_DESC, skip: 0) {
        banner {
          html
        }
        page {
          html
        }
      }
    }

    `,
  )

  return {
    props: { data: values[0], preview },
  }
}

export default Policy
