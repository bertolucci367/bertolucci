import GraphImg from 'graphcms-image'
import xw from 'xwind'
import styled from '@emotion/styled'
import ListLink from '~/components/products/ListLink'

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
  mx-2px mb-8
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

interface CardProps {
  children?: React.ReactNode
  photo: any
  title?: string
  designer?: string
  compare?: any
  path: string
}

const Card = ({
  children,
  path,
  photo,
  title,
  designer,
  compare,
}: CardProps) => {
  const _photo = photo[0] || {}
  return (
    <CardStyled>
      <ListLink href={path} compare={compare}>
        <a>
          <div css={xw`relative`}>
            <GraphImg
              image={_photo}
              alt={_photo.alt}
              fit="crop"
              css={xw`lg:h-cardImgD`}
            />
            <Hover css={xw`absolute bottom-1 left-2 z-20`}>{children}</Hover>
          </div>
          <Hover>
            <NameStyled>{title}</NameStyled>
            <DesignStyled>{designer}</DesignStyled>
          </Hover>
        </a>
      </ListLink>
    </CardStyled>
  )
}

export default Card
