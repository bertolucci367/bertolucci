import xw from 'xwind'
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
    <div
      css={[
        xw`sticky text-center hidden h-full lg:flex items-center lg:h-asideBody`,
        `top: 90px;`,
      ]}
    >
      {shared.compare.length > 0 && (
        <div css={xw`text-13px`}>
          <Link href="/produtos/comparar">
            <a css={xw`font-medium mb-2 hover:cursor-pointer`}>
              Acessar seleção de produtos:
            </a>
          </Link>
          <ul>
            {shared.compare.map((prod, i) => (
              <li key={i} css={xw`font-light`}>
                {prod.name} ({prod.code})
                <button
                  css={xw`opacity-30 ml-3`}
                  onClick={() => remove({ product: prod, shared })}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CompareList
