import Layout from '~/components/Layout'
import { useEffect } from 'react'
import { useState } from 'react'
import { gcms } from '~/services/gcms'

const Policy = ({ data }) => {
  const [cmsData, setCmsData] = useState('')

  useEffect(() => {
    setCmsData(data?.page?.html)
  }, [])

  return (
    <Layout>
      {cmsData && (
        <main
          dangerouslySetInnerHTML={{
            __html: cmsData,
          }}
          className="grid-in-main mb-20"
        ></main>
      )}
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
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
