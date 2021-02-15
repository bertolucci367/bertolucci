import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'
import Checkbox from '~/components/products/Checkbox'
import { add, remove, has } from '~/components/products/compare'

const Hover = styled.div([
  xw`lg:opacity-0`,
  {
    transition: 'opacity 350ms ease',
  },
])

const NameStyled = styled.h2(xw`text-14px font-medium mt-2 px-2 truncate`)
const DesignStyled = styled.p(xw`text-12px px-2 truncate`)

const ListUL = styled.ul(
  xw`
  col-start-1 col-end-4 lg:col-start-2 lg:col-end-3
  flex flex-wrap justify-between
  lg:justify-center

  `,
)

const CardStyled = styled.li([
  xw`
  relative h-card w-1/2 pr-2
  sm:min-w-card sm:w-1/3
  lg:h-cardD lg:w-1/6 lg:max-w-card
  `,
  {
    [':hover']: { cursor: 'pointer' },
    [`:hover ${Hover}`]: {
      opacity: 1,
    },
  },
])

const List = ({ products = [], show = false, close = {} }) => {
  const router = useRouter()
  const shared = useAppContext()

  const handleCheckbox = ({ isChecked, product }) => {
    isChecked ? add({ product, shared }) : remove({ product, shared })
  }

  return (
    <ListUL>
      {products.map((product, i) => (
        <CardStyled key={i}>
          {Object.keys(close).length > 0 && (
            <div css={xw`absolute z-20 -ml-8`}>
              <Link href={close}>
                <a>
                  <Image
                    src="/close.svg"
                    layout="fixed"
                    height="16"
                    width="16"
                    alt="close icon"
                  />
                </a>
              </Link>
            </div>
          )}
          <Link
            href={
              show
                ? `/produtos/${product.slug}`
                : `${router.asPath}/linhas/${product.family_slug}/${product.code}`
            }
          >
            <a>
              <div
                css={[
                  `
                  width: 100%;
                  background: url('http://bertolucci.com.br${product.cover_image_url}')`,
                  xw`
                  relative bg-gray-200 bg-center bg-cover h-cardImg
                  lg:h-cardImgD
                  `,
                ]}
              >
                <Hover css={xw`absolute bottom-1 left-2 z-20`}>
                  <Checkbox
                    name={product.slug}
                    fnChange={(v) => handleCheckbox({ isChecked: v, product })}
                    checked={has({ product, shared })}
                  />
                </Hover>
              </div>
              <Hover>
                <NameStyled>
                  {show
                    ? `${product.name} - ${product.code}`
                    : product.family_name}
                </NameStyled>
                <DesignStyled>{product.designer_name}</DesignStyled>
              </Hover>
            </a>
          </Link>
        </CardStyled>
      ))}
    </ListUL>
  )
}

export default List
