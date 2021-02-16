import { useState } from 'react'
import xw from 'xwind'
import styled from '@emotion/styled'

const DesignerWrap = styled.div(xw`lg:sticky top-36`)

const Photo = styled.div([
  xw`
  mr-5 mb-2 max-w-49%
  sm:mb-4 sm:w-1/3
  lg:mr-0 lg:w-full lg:min-w-full
`,
  { float: 'left' },
])

const Designer = ({ designer }) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <DesignerWrap>
      <Photo>
        <img
          src={`http://bertolucci.com.br${designer.images[0].image.image.url}`}
          css={xw`w-full`}
          height={200}
          width={200}
        />
      </Photo>
      <h1 css={xw`leading-tight font-medium text-18px mb-5 lg:mb-2`}>
        {designer.name}
      </h1>
      <a
        css={xw`block mb-4 text-12px font-medium text-gray-500 hover:cursor-pointer`}
        onClick={() => setReadMore(!readMore)}
      >
        <span aria-label="saiba mais">{!readMore && `[ Saiba + ]`}</span>
        <span aria-label="fechar">{readMore && `[ - ]`}</span>
      </a>

      <p
        css={xw`mb-5 text-13px`}
        style={{ display: readMore ? 'block' : 'none' }}
      >
        {designer.description}
      </p>
    </DesignerWrap>
  )
}

export default Designer
