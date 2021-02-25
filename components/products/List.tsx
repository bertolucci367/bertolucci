import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'
import GraphImg from 'graphcms-image'
import React, { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'
import Checkbox from '~/components/products/Checkbox'
import { add, remove, has } from '~/components/products/compare'
import ListLink from '~/components/products/ListLink'
import { slugify } from '~/components/products/MenuItem'

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

const List = ({ items = [], show = false, compare = false, close = {} }) => {
  const router = useRouter()
  const shared = useAppContext()

  const handleCheckbox = ({ isChecked, product }) => {
    isChecked ? add({ product, shared }) : remove({ product, shared })
  }

  const listItems = items.map(({ products, ...rest }, i) => {
    const [product] = products

    if (!product) return
    const [photo] = product.photo

    return [
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
        <ListLink
          href={
            show
              ? `/produtos/${product.slug}`
              : `${router.asPath}/linhas/${slugify(rest.name)}/${product.code}`
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
              <NameStyled>
                {rest.__typename === 'Line' && rest.name}
                {/* {show
                  ? `${product.name} - ${product.code}`
                  : product.family_name} */}
              </NameStyled>
              <DesignStyled>{product?.designer.name}</DesignStyled>
            </Hover>
          </a>
        </ListLink>
      </CardStyled>,
    ]
  })

  return <ListUL>{listItems}</ListUL>
}

export default List
