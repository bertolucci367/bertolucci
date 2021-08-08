import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppContext } from '~/components/context/AppContext'
import { remove } from '~/components/products/compare'

const CompareList = () => {
  const shared = useAppContext()
  const router = useRouter()

  const hidden = ['comparar', 'designers']

  const re = new RegExp(hidden.join('|'))

  if (re.test(router.asPath)) {
    return <></>
  }

  return (
    <>
      {shared.compare.length > 0 && (
        <div>
          <Link
            prefetch={false}
            href={{
              pathname: '/produtos/comparar',
              query: { p: shared.compare.map(o => o.slug) },
            }}
          >
            <a className={`font-medium mb-2 hover:cursor-pointer`}>
              Acessar seleção de produtos:
            </a>
          </Link>
          <ul>
            {shared.compare.map((prod, i) => (
              <li key={i} className={`font-light`}>
                {prod.name} ({prod.code})
                <button
                  className={`opacity-30 ml-3`}
                  onClick={() => remove({ product: prod, shared })}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default CompareList
