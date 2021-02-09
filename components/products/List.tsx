import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'

const Hover = styled.div([
  xw`lg:opacity-0`,
  {
    transition: 'opacity 350ms ease',
  },
])

const NameStyled = styled.h2(xw`text-14px font-medium mt-2`)

const DesignStyled = styled.p(xw`text-12px`)

const CardStyled = styled.li({
  [':hover']: { cursor: 'pointer' },
  [`:hover ${Hover}`]: {
    opacity: 1,
  },
  height: '270px',
})

const List = ({ products = [], href = '/', show = false, close = '' }) => {
  return (
    <ul
      css={[
        `
          grid-template-columns: repeat(auto-fit, minmax(225px, max-content));
        justify-content: center;
        `,
        xw`grid gap-x-1 col-start-1 col-end-4 lg:col-start-2 lg:col-end-3 `,
      ]}
    >
      {products.map((product) => (
        <CardStyled key={product.code}>
          {close && (
            <Link href={close}>
              <a>X</a>
            </Link>
          )}
          <Link
            href={
              show
                ? `/produtos/${product.slug}`
                : `/produtos/linhas/${product.family_slug}/${product.code}`
            }
          >
            <a>
              <div
                css={[
                  `width: 100%; height: 200px; background: url('http://bertolucci.com.br${product.cover_image_url}')`,
                  xw`bg-gray-200 bg-center bg-cover`,
                ]}
              ></div>
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
