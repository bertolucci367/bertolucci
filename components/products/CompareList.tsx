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
        <div
          className={`
        text-center fixed left-0 bottom-0 w-full z-[99]
        lg:sticky lg:top-1/2 lg:-translate-y-1/2
        animate-slide-footer
      `}
        >
          <div
            className={`
           bg-white bg-opacity-90 z-[999] w-full lg:static
        `}
          >
            <div className="px-6 pt-8 pb-4 md:flex md:justify-between md:items-center lg:flex-col lg:px-0">
              <Link
                prefetch={false}
                href={{
                  pathname: '/produtos/comparar',
                  query: { p: shared.compare.map(o => o.slug) },
                }}
              >
                <a className="font-medium mb-6 block hover:cursor-pointer lg:mb-8">
                  Selecione as luminárias para consulta
                </a>
              </Link>
              <ul className="hidden lg:block">
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

              <Link
                prefetch={false}
                href={{
                  pathname: '/produtos/comparar',
                  query: { p: shared.compare.map(o => o.slug) },
                }}
              >
                <a className="btn lg:mt-10">
                  Solicitar consulta
                  <span className="lg:hidden"> ({shared.compare.length})</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CompareList
