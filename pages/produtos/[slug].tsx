import { useRouter } from 'next/router'
import LayoutProduct from '~/components/LayoutProduct'
import Container from '~/components/Container'
import xw from 'xwind'
import styled from '@emotion/styled'
import Image from 'next/image'

const Hover = styled.div([xw`bg-red-200`])
const InfoStyled = styled.div([
  xw`absolute bottom-0 h-40 p-4
    bg-white text-center
    overflow-hidden
    transition-all`,
  {
    [`:hover`]: {
      height: 'auto',
    },
  },
])

const FinishingCategoryStyled = styled.li({
  [':after']: {
    content: '"/"',
    padding: '0 5px',
  },
})

const Product = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <LayoutProduct>
      <Container>
        <div
          css={[
            `width: 100%; height: calc(100vh - 90px); background: url('${`https://placedog.net/1600/680`}')`,
            xw`bg-gray-200 bg-center bg-cover relative pb-40`,
          ]}
        >
          <div css={[xw`absolute top-0 bg-white lg:-left-8`]}>
            <Image
              src="/close.svg"
              layout="fixed"
              height="16"
              width="16"
              alt="close icon"
            />
          </div>
          <InfoStyled>
            <hgroup className="itemInfo">
              <h2 css={xw`text-13px mb-1 font-futura-m`}>ju.ab - A920</h2>
              <h3></h3>
            </hgroup>

            <div css={xw`text-13px flex`}>
              <div css={xw`flex-1 text-left`}>
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
              </div>

              <div css={xw`flex-1 text-left ml-5`}>
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
                  <span className="  ">
                    <label className="dimention">L</label>45 cm"
                  </span>
                  <span className="  ">
                    <label className="dimention">P</label> 20 cm"
                  </span>
                </p>

                <p>
                  <label className="none">tipo de lâmpada</label>3 x LED E27
                </p>

                <label css={xw`font-futura-m font-bold`}>acabamentos</label>

                <div>
                  <ul css={xw`flex`}>
                    <FinishingCategoryStyled>madeiras</FinishingCategoryStyled>
                    <FinishingCategoryStyled>cobre</FinishingCategoryStyled>
                    <FinishingCategoryStyled>latão</FinishingCategoryStyled>
                  </ul>
                </div>
              </div>
            </div>
          </InfoStyled>
        </div>
      </Container>
    </LayoutProduct>
  )
}

export default Product
