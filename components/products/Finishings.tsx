import xw from 'xwind'
import styled from '@emotion/styled'
import GraphImg from 'graphcms-image'
import { useState, useEffect } from 'react'

const FinishingCategoryStyled = styled.li({
  [':after']: {
    content: '"/"',
    padding: '0 5px',
  },
})

const Tooltip = styled.div([
  xw`bg-gray-100 hidden absolute z-10 bottom-20 left-0 shadow-xl`,
])

const ThumbStyled = styled.li([
  xw`flex flex-col w-full`,
  {
    [`:hover ${Tooltip}`]: {
      display: 'block',
    },
  },
])

const Finishings = ({ finishings }) => {
  const categories = Array.from(new Set(finishings.map(f => f.category.name)))
  const [curr, setCurr] = useState(categories[0])
  const [thumbs, setThumbs] = useState([])

  const getFinishings = () => finishings.filter(f => f.category.name === curr)

  useEffect(() => {
    const _thumbs = getFinishings()
    setThumbs(_thumbs)
  }, [curr])

  return (
    <div>
      <ul css={xw`flex flex-wrap`}>
        {categories.map((c, i) => (
          <FinishingCategoryStyled key={i} onClick={() => setCurr(c)}>
            <span
              css={
                c === curr
                  ? xw`font-medium hover:cursor-pointer`
                  : xw`hover:cursor-pointer`
              }
            >
              {c}
            </span>
          </FinishingCategoryStyled>
        ))}
      </ul>
      <ul css={xw`grid grid-cols-3 gap-4 lg:hidden`}>
        {thumbs.map(f => (
          <li key={f.id} css={xw`flex flex-col bg-gray-100 w-full`}>
            <GraphImg image={f.thumb} fit="crop" css={xw`w-full h-32`} />
            <label htmlFor={f.id} css={xw`p-2 block`}>
              {f.name}
            </label>
          </li>
        ))}
      </ul>
      <ul css={xw`hidden lg:grid grid-flow-col auto-cols-max gap-4 relative`}>
        {thumbs.map(f => (
          <ThumbStyled key={f.id}>
            <GraphImg image={f.thumb} fit="crop" css={xw`w-14 h-14`} />

            <Tooltip>
              <GraphImg
                image={f.thumb}
                fit="crop"
                css={xw`w-tooltip h-tooltip`}
              />
              <label htmlFor={f.id} css={xw`p-4 block`}>
                {f.name}
              </label>
            </Tooltip>
          </ThumbStyled>
        ))}
      </ul>
    </div>
  )
}

export default Finishings
