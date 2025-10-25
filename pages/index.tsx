import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import Layout from '~/components/Layout'
import Image from 'next/image'

const Index = ({ data }) => {
  const [windowWidthSize, setWindowWidthSize] = useState(0)
  const [windowHeightSize, setWindowHeightSize] = useState(0)

  const getImageByResolution = ({ photoCover, photoCoverMobile }) =>
    windowWidthSize > windowHeightSize ? photoCover : photoCoverMobile

  const getImages = ({ photoCover, photoCoverMobile }) =>
    getImageByResolution({
      photoCover,
      photoCoverMobile,
    }).map(({ width, height, url, alt }) => {
      return (
        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover w-full h-auto`}
          style={{ position: 'unset' }}
          layout="fill"
        />
      )
    })

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
      <div data-label="slider" className="col-start-[1] col-end-[-1]">
        {data.items.map(({ id, photoCover, photoCoverMobile }) => {
          const images = getImages({ photoCover, photoCoverMobile })
          return (
            <div key={id} className={`h-slimSlide lg:h-wideSlide`}>
              <Slider slides={images} />
            </div>
          )
        })}
      </div>
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
          <div className={`absolute h-full w-full overflow-hidden`}>{s}</div>
        </div>
      ))}
    </section>
  )
}

export async function getStaticProps({ preview = false }) {
  const gcms = new GraphQLClient(process.env.GRAPHCMS_API)

  const { values } = await gcms.request(
    `
    query {
      values: page (where: { slug: "home"}) {

        id
        stage
        updatedAt
        createdAt
        description
        id
        items {
          ... on Slider {
            id
            textPhoto
            photoCoverMobile {
              handle
              height
              width
              url
              alt
            }
            photoCover {
              handle
              height
              width
              url
              alt
            }
          }

        }
        slug
        title
      }
    }

    `,
  )

  return {
    props: { data: values, preview },
  }
}

export default Index
