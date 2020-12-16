import xw from 'xwind'
import Image from 'next/image'
import { GraphQLClient } from 'graphql-request'
import GraphImg from 'graphcms-image'

const Index = ({ homes }) => {
  return (
    <>
      {homes.map(({ id, photoCoverMobile }) => {
        const { handle, width, height } = photoCoverMobile

        return (
          <div
            key={id}
            css={xw` bg-gray-700 justify-center items-center h-screen w-screen`}
          >
            <div
              css={xw`h-36 z-10 p-12
                      w-screen
                      bg-red-300
                      fixed`}
            >
              <Image
                src="/logo.svg"
                layout="fixed"
                height="19"
                width="90"
                alt="bertolucci"
              />
            </div>

            <div css={xw`fixed h-screen w-screen overflow-hidden text-white`}>
              <GraphImg
                image={{ handle, width, height }}
                withWebp={true}
                style={{ position: 'unset' }}
              />
            </div>
          </div>
        )
      })}
    </>
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
          url
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
