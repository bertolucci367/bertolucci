import GraphImg from 'graphcms-image'
import ListLink from '~/components/products/ListLink'

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
    <li
      className="relative w-1/2
    px-2px mb-8
    sm:min-w-card sm:w-1/3
    lg:w-1/6 lg:max-w-card lg:min-h-cardD lg:mb-0"
    >
      <ListLink href={path} compare={compare}>
        <a className="group">
          <div className={`relative`}>
            <GraphImg
              image={_photo}
              alt={_photo.alt}
              fit="crop"
              className={`lg:h-cardImgD`}
            />
            <div
              className={`opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-1 left-2 z-20`}
            >
              {children}
            </div>
          </div>
          <div
            data-label="card-title"
            className="lg:opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <h2 className="text-14px leading-none text-gray-555 font-medium mt-2 px-2 truncate">
              {title}
            </h2>
            <p className="text-12px px-2 truncate">{designer}</p>
          </div>
        </a>
      </ListLink>
    </li>
  )
}

export default Card
