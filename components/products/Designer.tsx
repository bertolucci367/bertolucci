import { useState } from 'react'
import GraphImg from 'graphcms-image'

const DesignerWrap = ({ children }) => (
  <div className="lg:sticky top-36">{children}</div>
)

const Photo = ({ children }) => (
  <div
    className="float-left mr-5 mb-2 w-full max-w-49%
                sm:mb-4 sm:w-1/3
                lg:mr-0 lg:min-w-full"
  >
    {children}
  </div>
)

const Designer = ({ designer }) => {
  const [readMore, setReadMore] = useState(false)
  const [photo] = designer.photo
  return (
    <DesignerWrap>
      {photo && (
        <Photo>
          <GraphImg image={photo} alt={photo.alt} fit="crop" />
        </Photo>
      )}

      <h1 className={`leading-tight font-medium text-18px mb-5 lg:mb-2`}>
        {designer.name}
      </h1>
      <a
        className={`block mb-4 text-12px font-medium text-gray-500 hover:cursor-pointer`}
        onClick={() => setReadMore(!readMore)}
      >
        <span aria-label="saiba mais">{!readMore && `[ Saiba + ]`}</span>
        <span aria-label="fechar">{readMore && `[ - ]`}</span>
      </a>

      <div
        className={`mb-5 text-13px`}
        style={{ display: readMore ? 'block' : 'none' }}
        dangerouslySetInnerHTML={{
          __html: designer?.description?.html,
        }}
      ></div>
    </DesignerWrap>
  )
}

export default Designer
