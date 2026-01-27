import Link from 'next/link'
import Image from 'next/image'
import ListLink from '~/components/products/ListLink'
import Checkbox from '~/components/products/Checkbox'
import { add, remove, has } from '~/components/products/compare'
import React, { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'

const CardStyled = `
  relative w-1/2
  mb-8 px-2px
  sm:min-w-card sm:w-1/3
  lg:w-1/6 lg:max-w-card lg:min-h-cardD lg:mb-0
  `

const Card = ({
  product,
  show = false,
  compare = false,
  close = {},
  useLineName = false,
  useProductCode = false,
  nameVisible = false,
  priority = false,
}) => {
  const router = useRouter()
  const shared = useAppContext()

  const [photo] =
    product.cover && product.cover.length > 0 ? product.cover : product.photo

  const [line] = product.lines

  let nickname = [product.name]

  if (useProductCode) {
    nickname.push(product.code)
  }

  if (useLineName) {
    nickname = [line.name]
  }

  const handleCheckbox = ({ isChecked, product }) => {
    isChecked ? add({ product, shared }) : remove({ product, shared })
  }

  return (
    <li className={CardStyled}>
      {Object.keys(close).length > 0 && (
        <div className={`absolute z-20 -ml-8`}>
          <Link href={close}>
            <a>
              <Image
                src="/close.svg"
                layout="fixed"
                height="16"
                width="16"
                alt="close icon"
              />
            </a>
          </Link>
        </div>
      )}
      <ListLink
        href={
          show
            ? `/produtos/${product.slug}`
            : `${router.asPath}/linhas/${line.slug}/${product.code}`
        }
        compare={compare}
      >
        <a className="group hover:no-underline">
          <div className={`relative`}>
            <div
              className={`relative min-h-[200px] lg:h-cardImgD`}
              data-img={photo?.url}
            >
              <Image
                src={photo?.url}
                alt={photo?.alt}
                objectFit="cover"
                layout="fill"
                quality={100}
                sizes="(min-width: 1024px) 16.66vw, (min-width: 640px) 33.33vw, 50vw"
                priority={priority}
                unoptimized={process.env.NODE_ENV === 'production'}
              />
            </div>
            <div
              className={`absolute bottom-8px left-8px z-20 pt-0
              transition-opacity duration-300 group-hover:opacity-100
              ${has({ product, shared }) ? 'opacity-100' : 'lg:opacity-0'}`}
            >
              <Checkbox
                name={product.slug}
                fnChange={v => handleCheckbox({ isChecked: v, product })}
                checked={has({ product, shared })}
              />
            </div>
          </div>
          <div
            className={`${
              nameVisible ? '' : 'lg:opacity-0'
            } transition-opacity duration-300 group-hover:opacity-100`}
          >
            <h2 className="text-14px text-gray-555 font-medium mt-8px mb-0 px-2 truncate">
              {nickname.join(' - ')}
            </h2>
            <p className="text-12px px-2 truncate font-normal ">
              {product?.designer?.name}
            </p>
          </div>
        </a>
      </ListLink>
    </li>
  )
}

export default Card
