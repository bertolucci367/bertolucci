import GraphImg from 'graphcms-image'
import { useState, useEffect } from 'react'
import uniqBy from 'lodash/uniqBy'

const Finishings = ({ finishings }) => {
  const publishedValid = finishings
    .filter(f => f.stage === 'PUBLISHED')
    .filter(f => f.thumb != null)

  const unique = uniqBy(publishedValid, 'id')

  const categories = Array.from(new Set(unique.map(f => f.category.name)))

  const [curr, setCurr] = useState(categories[0])
  const [thumbs, setThumbs] = useState([])

  const getAlt = f => {
    return f.alt || f.name
  }

  const getFinishings = () => unique.filter(f => f.category.name === curr)

  useEffect(() => {
    const _thumbs = getFinishings()
    setThumbs(_thumbs)
  }, [curr])

  return (
    <div>
      <ul className={`flex flex-wrap`}>
        {categories.map((c, i) => (
          <li
            className="finishing-category-thumb"
            key={i}
            onClick={() => setCurr(c)}
          >
            <span
              className={
                c === curr
                  ? `font-medium hover:cursor-pointer`
                  : `hover:cursor-pointer`
              }
            >
              {c}
            </span>
          </li>
        ))}
      </ul>
      <ul className={`grid grid-cols-3 gap-4 lg:hidden`}>
        {thumbs.map(f => (
          <li key={f.id} className={`flex flex-col bg-gray-100 w-full`}>
            <GraphImg
              image={f.thumb}
              fit="crop"
              className={`w-full h-32`}
              alt={getAlt(f)}
            />
            <label htmlFor={f.id} className={`p-2 block font-medium`}>
              {f.name}
            </label>
          </li>
        ))}
      </ul>
      <ul className={`hidden relative lg:flex flex-wrap`}>
        {thumbs.map(f => (
          <li
            className="group flex flex-col w-full lg:w-10 lg:h-10 m-2px"
            key={f.id}
          >
            <GraphImg
              image={f.thumb}
              fit="crop"
              className={`w-10 h-10`}
              alt={getAlt(f)}
            />

            <div className="bg-gray-100 hidden group-hover:block absolute z-10 top-0 left-0 transform -translate-y-full -mt-4 shadow-2xl">
              <GraphImg
                image={f.thumb}
                fit="crop"
                className={`w-96 h-48`}
                alt={getAlt(f)}
              />
              <label htmlFor={f.id} className={`p-4 block`}>
                {f.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Finishings
