import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useState, useEffect } from 'react'
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

const NameStyled = styled.h2(xw`text-14px font-medium mt-2 px-2`)

const DesignStyled = styled.p(xw`text-12px px-2`)

const CardStyled = styled.li([
  xw`min-w-full sm:min-w-card relative`,
  {
    [':hover']: { cursor: 'pointer' },
    [`:hover ${Hover}`]: {
      opacity: 1,
    },
    height: '270px',
    margin: '0 2px',
  },
])

const List = ({ products = [], show = false, close = {} }) => {
  const router = useRouter()
  const shared = useAppContext()

  const handleCheckbox = ({ isChecked, product }) => {
    isChecked ? add({ product, shared }) : remove({ product, shared })
  }

  return (
    <ul
      css={[
        xw`flex flex-wrap justify-center col-start-1 col-end-4 lg:col-start-2 lg:col-end-3`,
      ]}
    >
      {products.map((product, i) => (
        <CardStyled key={i}>
          {Object.keys(close).length > 0 && <Link href={close}>Close</Link>}
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
                  height: 200px;
                  background: url('http://bertolucci.com.br${product.cover_image_url}')`,
                  xw`relative bg-gray-200 bg-center bg-cover`,
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
    </ul>
  )
}

export default List
