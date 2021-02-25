import Link from 'next/link'
import Image from 'next/image'
import GraphImg from 'graphcms-image'
import xw from 'xwind'
import styled from '@emotion/styled'
import ListLink from '~/components/products/ListLink'
import { slugify } from '~/components/products/MenuItem'
import Checkbox from '~/components/products/Checkbox'
import { add, remove, has } from '~/components/products/compare'
import React, { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'

const Hover = styled.div([
  xw`lg:opacity-0`,
  {
    transition: 'opacity 350ms ease',
  },
])
const NameStyled = styled.h2(xw`text-14px font-medium mt-2 px-2 truncate`)
const DesignStyled = styled.p(xw`text-12px px-2 truncate`)
const CardStyled = styled.li([
  xw`
  relative w-1/2
  pr-2 mb-8
  sm:min-w-card sm:w-1/3
  lg:w-1/6 lg:max-w-card
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
            <Hover css={xw`absolute bottom-1 left-2 z-20`}>
              <Checkbox
                name={product.slug}
                fnChange={v => handleCheckbox({ isChecked: v, product })}
                checked={has({ product, shared })}
              />
            </Hover>
          </div>
          <Hover>
            <NameStyled>{nickname.join(' - ')}</NameStyled>
            <DesignStyled>{product?.designer.name}</DesignStyled>
          </Hover>
        </a>
      </ListLink>
    </CardStyled>
  )
}

export default Card