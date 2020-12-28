import { useEffect, useState } from 'react'
import xw from 'xwind'
import { GraphQLClient } from 'graphql-request'
import GraphImg from 'graphcms-image'
import { css } from '@emotion/react'
import Layout from '../components/Layout'

const Index = ({ homes }) => {
  const [windowWidthSize, setWindowWidthSize] = useState(0)
  const [windowHeightSize, setWindowHeightSize] = useState(0)

  useEffect(() => {
    function handleResize() {
      const { width, height } = document.body.getBoundingClientRect()

      setWindowWidthSize(Math.ceil(width))
      setWindowHeightSize(Math.ceil(height))
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getImageByResolution = ({ photoCover, photoCoverMobile }) =>
    windowWidthSize > windowHeightSize ? photoCover : photoCoverMobile

  return (
    <Layout>
      {homes.map(({ id, photoCover, photoCoverMobile }) => {
        const { handle, width, height } = getImageByResolution({
          photoCover,
          photoCoverMobile,
        })

        return (
          <div key={id} css={xw`row-start-2 col-start-1 col-end-4`}>
            <div
              css={[
                xw`relative`,
                {
                  height: `calc(100vh - ${
                    windowWidthSize >= windowHeightSize ? 90 : 70
                  }px)`,
                },
              ]}
            >
              <div
                css={xw`absolute pointer-events-none h-full w-full overflow-hidden`}
              >
                <GraphImg
                  image={{ handle, width, height }}
                  withWebp={true}
                  style={{ position: 'unset' }}
                  maxWidth={windowWidthSize > windowHeightSize ? 1920 : 768}
                />
              </div>

              <main css={xw`relative`}></main>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  const { homes } = await gcms.request(
    `
    {
      homes {
        id
        textPhoto
        photoCoverMobile {
          handle
          height
          width
        }
        photoCover {
          handle
          height
          width
        }
      }
    }
    `,
  )

  return {
    props: { homes, preview },
  }
}

export default Index
