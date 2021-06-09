import Link from 'next/link'
import Image from 'next/image'
import GraphImg from 'graphcms-image'
import xw from 'xwind'
import styled from '@emotion/styled'
import ListLink from '~/components/products/ListLink'
import Checkbox from '~/components/products/Checkbox'
import { add, remove, has } from '~/components/products/compare'
import React, { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'

type HoverProps = {
  isOpacity?: boolean
}

const Hover = styled.div<HoverProps>(({ isOpacity }) => [
  {
    transition: 'opacity 350ms ease',
  },
  `@media (min-width: 1024px) {
    opacity: ${isOpacity ? '1' : '0'}
  }`,
])
const NameStyled = styled.h2(
  xw`text-14px leading-none text-gray-555 font-medium mt-8px px-2 truncate`,
)
const DesignStyled = styled.p(xw`text-12px px-2 truncate`)
const CardStyled = styled.li([
  xw`
  relative w-1/2
  mb-8 px-2px
  sm:min-w-card sm:w-1/3
  lg:w-1/6 lg:max-w-card lg:min-h-cardD lg:mb-0
  `,
  {
    [':hover']: { cursor: 'pointer' },
    [`:hover ${Hover}`]: {
      opacity: 1,
    },
  },
])

const Card = ({
  product,
  show = false,
  compare = false,
  close = {},
  useLineName = false,
  useProductCode = false,
}) => {
  const router = useRouter()
  const shared = useAppContext()
  const [photo] = product.photo

  const [line] = product.lines

  let nickname = [product.name]

  if (useProductCode) {
    nickname.push(product.code)
  }

  if (useLineName) {
    nickname = [line.name]
  }

  const handleCheckbox = ({ isChecked, product }) => {
    isChecked ? add({ product, shared }) : remove({ product, shared })
  }

  return (
    <CardStyled>
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
      <ListLink
        href={
          show
            ? `/produtos/${product.slug}`
            : `${router.asPath}/linhas/${line.slug}/${product.code}`
        }
        compare={compare}
      >
        <a>
          <div css={xw`relative`}>
            <GraphImg
              image={photo}
              alt={photo.alt}
              fit="crop"
              css={xw`lg:h-cardImgD`}
            />
            <Hover
              css={[xw`absolute bottom-1 left-2 z-20 pt-0`]}
              isOpacity={has({ product, shared })}
            >
              <Checkbox
                name={product.slug}
                fnChange={v => handleCheckbox({ isChecked: v, product })}
                checked={has({ product, shared })}
              />
            </Hover>
          </div>
          <Hover>
            <NameStyled>{nickname.join(' - ')}</NameStyled>
            <DesignStyled>{product?.designer?.name}</DesignStyled>
          </Hover>
        </a>
      </ListLink>
    </CardStyled>
  )
}

export default Card
