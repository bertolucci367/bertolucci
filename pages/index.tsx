import { useEffect, useState } from 'react'
import xw from 'xwind'
import { GraphQLClient } from 'graphql-request'
import GraphImg from 'graphcms-image'
import Layout from '~/components/Layout'

const Index = ({ homes }) => {
  const [windowWidthSize, setWindowWidthSize] = useState(0)
  const [windowHeightSize, setWindowHeightSize] = useState(0)

  const getImageByResolution = ({ photoCover, photoCoverMobile }) =>
    windowWidthSize > windowHeightSize ? photoCover : photoCoverMobile

  const getImages = ({ photoCover, photoCoverMobile }) =>
    getImageByResolution({
      photoCover,
      photoCoverMobile,
    }).map(({ handle, width, height }) => (
      <GraphImg
        image={{ handle, width, height }}
        withWebp={true}
        style={{ position: 'unset' }}
        maxWidth={windowWidthSize > windowHeightSize ? 1920 : 768}
      />
    ))

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

  return (
    <Layout>
      {homes.map(({ id, photoCover, photoCoverMobile }) => {
        const images = getImages({ photoCover, photoCoverMobile })
        return (
          <div key={id} css={xw`row-start-2 col-start-1 col-end-4`}>
            <div
              css={[
                xw`relative`,
                `
                height: calc(100vh - 70px);

                @media (orientation: landscape) {
                  height: calc(100vh - 40px);
                }

                @media (min-width: 1024px) {
                  height: calc(100vh - 90px);
                }
                `,
              ]}
            >
              <Slider slides={images} />
              <main css={xw`relative`}></main>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

const Slider = ({ slides }) => {
  const [curr, setCurr] = useState(0)
  const { length } = slides

  const goToNext = () => {
    setCurr(curr >= length - 1 ? 0 : curr + 1)
  }

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(goToNext, 5000)
    return function () {
      clearTimeout(timer)
    }
  })

  useEffect(() => {
    if (length === 1) {
      setCurr(0)
    }
  }, [length])

  if (!Array.isArray(slides) || length <= 0) {
    return null
  }

  return (
    <section className="slider">
      {slides.map((s, i) => (
        <div className={i === curr ? 'slide active' : 'slide'} key={i}>
          <div
            css={xw`absolute pointer-events-none h-full w-full overflow-hidden`}
          >
            {s}
          </div>
        </div>
      ))}
    </section>
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
