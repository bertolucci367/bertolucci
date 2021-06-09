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
  xw`bg-gray-100 hidden absolute z-10 top-0 left-0 transform -translate-y-full -mt-4 shadow-2xl`,
])

const ThumbStyled = styled.li([
  xw`flex flex-col w-full lg:w-10 lg:h-10 m-2px`,
  {
    [`:hover ${Tooltip}`]: {
      display: 'block',
    },
  },
])

const Finishings = ({ finishings }) => {
  const publishedValid = finishings
    .filter(f => f.stage === 'PUBLISHED')
    .filter(f => f.thumb != null)
  const categories = Array.from(
    new Set(publishedValid.map(f => f.category.name)),
  )
  const [curr, setCurr] = useState(categories[0])
  const [thumbs, setThumbs] = useState([])

  const getFinishings = () =>
    publishedValid.filter(f => f.category.name === curr)

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
      <ul css={xw`hidden relative lg:flex flex-wrap`}>
        {thumbs.map(f => (
          <ThumbStyled key={f.id}>
            <GraphImg image={f.thumb} fit="crop" css={xw`w-10 h-10`} />

            <Tooltip>
              <GraphImg image={f.thumb} fit="crop" css={xw`w-96 h-48`} />
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
