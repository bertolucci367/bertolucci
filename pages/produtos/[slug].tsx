import { useRouter } from 'next/router'
import xw from 'xwind'
import styled from '@emotion/styled'
import LayoutProduct from '~/components/LayoutProduct'
import Container from '~/components/Container'
import Carousel from '~/components/Carousel'

// lg:absolute lg:bottom-0 lg:h-40
const InfoStyled = styled.div([
  xw`bg-white text-center py-6
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

const url = [
  'http://bertolucci.com.br/uploads/product_images/image/5dcc16fba7ab754bba000098/hires_atelier_bam_ab-umbu_7_.jpg',
  'http://bertolucci.com.br//uploads/product_images/image/58d2cd7ca7ab75b5c5000007/hires_atelier_bam_ab-ju-movimento_web.jpg',
]

const images = [<img src={url[0]} />, <img src={url[1]} />]

const Product = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <LayoutProduct>
      <Container>
        <Carousel slides={images} close nav>
          <InfoStyled>
            <hgroup className="itemInfo">
              <h2 css={xw`text-14px mb-1 font-medium`}>ju.ab - A920</h2>
              <h3></h3>
            </hgroup>

            <InfoBody>
              <InfoTextBlock>
                <p>
                  O designer Zanini de Zanine, possuidor de um trabalho
                  consolidado em madeira, assina a linha Ju em homenagem à sua
                  avó, cujas luminárias serviram de inspiração. A coleção possui
                  como diferencial a forma e o uso de duas longas hastes que
                  sustentam os refletores: “Quis fugir do tradicional, por isso,
                  as cúpulas não são redondas nem quadradas. Elas são elegantes
                  e funcionais, com o emprego de um ótimo material e
                  acabamento”, explica o designer.
                </p>
              </InfoTextBlock>

              <InfoTextBlock css={xw`lg:ml-5`}>
                <span>
                  <p>
                    Abajur de madeira Imbuia ou Louro Preto. Estrutura metálica
                    em latão polido, cobre polido ou latão cromado. Interruptor
                    embutido na base.
                  </p>
                </span>

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

export default Product
