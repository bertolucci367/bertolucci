import Image from 'next/image'
import ListLink from '~/components/products/ListLink'

interface CardProps {
  children?: React.ReactNode
  photo: any
  title?: string
  designer?: string
  compare?: any
  path: string
  priority?: boolean
}

const Card = ({
  children,
  path,
  photo,
  title,
  designer,
  compare,
  priority = false,
}: CardProps) => {
  const _photo = photo[0] || {}

  if (!_photo || !_photo.url) {
    return null
  }

  return (
    <li
      className="relative w-1/2
    px-2px mb-8
    sm:min-w-card sm:w-1/3
    lg:w-1/6 lg:max-w-card lg:min-h-cardD lg:mb-0"
    >
      <ListLink href={path} compare={compare}>
        <a className="group hover:no-underline">
          <div className={`relative`}>
            <div className={`relative lg:h-cardImgD`}>
              <Image
                src={_photo?.url}
                alt={_photo?.alt}
                objectFit="cover"
                layout="fill"
                sizes="(min-width: 1024px) 16.66vw, (min-width: 640px) 33.33vw, 50vw"
                priority={priority}
              />
            </div>
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
            <h2 className="text-14px text-gray-555 font-medium mt-2 px-2">
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
