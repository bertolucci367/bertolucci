import { useEffect, useState } from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'
import LayoutProduct from '~/components/LayoutProduct'
import Container from '~/components/Container'
import Carousel from '~/components/Carousel'
import { useAppContext } from '~/components/context/AppContext'

const InfoStyled = styled.div([
  xw`
    bg-white text-center py-6
    overflow-hidden
    transition-all
    `,
])

const InfoBody = styled.div(xw`text-14px lg:flex`)

const InfoTextBlock = styled.div(xw`lg:flex-1 text-left`)

const FinishingCategoryStyled = styled.li({
  [':after']: {
    content: '"/"',
    padding: '0 5px',
  },
})

const Product = ({ product }) => {
  const shared = useAppContext()

  let path = `${shared.productClosePath}/${product.family_slug}/${product.code}`

  if (!shared.goToLines) {
    path = shared.productClosePath
  }

  const images = product.images.map((img: any) => {
    return <img src={`http://bertolucci.com.br${img.image.image.url}`} />
  })

  return (
    <LayoutProduct>
      <Container>
        <Carousel slides={images} close={path} nav>
          <InfoStyled>
            <hgroup className="itemInfo">
              <h2 css={xw`text-14px mb-1 font-medium`}>
                {product.name} - {product.code}
              </h2>
              <h3></h3>
            </hgroup>

            <InfoBody>
              <InfoTextBlock
                dangerouslySetInnerHTML={{
                  __html: product.description_formatted,
                }}
              ></InfoTextBlock>

              <InfoTextBlock css={xw`lg:ml-5`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.text_formatted,
                  }}
                ></div>

                <p>
                  <span>
                    <label>H</label> 55 cm
                  </span>
                  <span>
                    <label className="dimention">L</label>45 cm"
                  </span>
                  <span>
                    <label className="dimention">P</label> 20 cm"
                  </span>
                </p>

                <p>
                  <label className="none">tipo de lâmpada</label>3 x LED E27
                </p>

                <label css={xw`font-medium`}>acabamentos</label>

                <div>
                  <ul css={xw`flex`}>
                    <FinishingCategoryStyled>madeiras</FinishingCategoryStyled>
                    <FinishingCategoryStyled>cobre</FinishingCategoryStyled>
                    <FinishingCategoryStyled>latão</FinishingCategoryStyled>
                  </ul>
                </div>
              </InfoTextBlock>
            </InfoBody>
          </InfoStyled>
        </Carousel>
      </Container>
    </LayoutProduct>
  )
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://bertolucci.com.br/api/produtos/${params.slug}.json`,
  )
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { product: data?.products[0] }, // will be passed to the page component as props
  }
}

export default Product
