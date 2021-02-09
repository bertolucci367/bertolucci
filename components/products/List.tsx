import xw from 'xwind'
import styled from '@emotion/styled'
import Link from 'next/link'

const Hover = styled.div([
  xw`lg:opacity-0`,
  {
    transition: 'opacity 350ms ease',
  },
])

const NameStyled = styled.h2(xw`text-14px`)

const DesignStyled = styled.p(xw`text-12px`)

const Card = styled.li({
  [':hover']: { cursor: 'pointer' },
  [`:hover ${Hover}`]: {
    opacity: 1,
  },
  height: '270px',
})

const List = ({ products = [], href = '/', show = false }) => {
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
        <Link
          href={
            show
              ? `/produtos/${product.slug}`
              : `/produtos/linhas/${product.family_slug}/${product.code}`
          }
          key={product.code}
        >
          <Card>
            <div
              css={[
                `width: 100%; height: 200px; background: url('http://bertolucci.com.br${product.cover_image_url}')`,
                xw`bg-gray-200 bg-center bg-cover`,
              ]}
            ></div>
            <Hover>
              <NameStyled>{product.name}</NameStyled>
              <DesignStyled>{product.design}</DesignStyled>
            </Hover>
          </Card>
        </Link>
      ))}
    </ul>
  )
}

export default List
