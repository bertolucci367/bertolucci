import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'
import { useRouter } from 'next/router'

interface Material {
  name: string
  slug: string
}

interface DataProps {
  materials: Material[]
}

const SubMenuMaterials = () => {
  const router = useRouter()
  const { data, error } = useSWR<DataProps>('/api/sub-menus', fetcher)

  if (error) {
    return (
      <p role="alert" className="text-12px">
        Não foi possível carregar os materiais.
      </p>
    )
  }

  if (!data) return null

  return (
    <nav aria-label="Materiais">
      <ul className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-center">
        {data.materials.map(material => {
          const href = `/produtos/materiais/${material.slug}`
          const isActive = router.asPath.split('?')[0] === href

          return (
            <li key={material.slug} className="my-5 lg:my-0">
              <Link href={href} prefetch={false}>
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-block text-12px leading-tight lg:px-5 ${
                    isActive ? 'underline' : ''
                  }`}
                >
                  {material.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SubMenuMaterials
