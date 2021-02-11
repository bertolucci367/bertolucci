import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'
import Checkbox from '~/components/products/Checkbox'

const Hover = styled.div([
  xw`lg:opacity-0`,
  {
    transition: 'opacity 350ms ease',
  },
])

const NameStyled = styled.h2(xw`text-14px font-medium mt-2`)

const DesignStyled = styled.p(xw`text-12px`)

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

  const initialState = products.reduce((acc, p) => {
    return { ...acc, [`${p.slug}`]: shared.compare.includes(p.slug) }
  }, {})

  const [state, setState] = useState(initialState)

  const handleCheckbox = ({ v, product }) => {
    setState((prevState) => ({
      ...prevState,
      [`${product.slug}`]: v,
    }))
  }

  useEffect(() => {
    Object.entries(state).forEach(([key, value]) => {
      const idx = shared.compare.findIndex((val) => val === key)
      if (value && idx === -1) {
        shared.compare.push(key)
      } else if (!value && idx >= 0) {
        shared.compare.splice(idx, 1)
      }
    })
  }, [state])

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
                <div css={xw`absolute bottom-1 left-2 z-20`}>
                  <Checkbox
                    name={product.slug}
                    fnChange={(v) => handleCheckbox({ v, product })}
                    checked={state[`${product.slug}`]}
                  />
                </div>
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
