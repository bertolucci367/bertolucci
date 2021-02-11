import xw from 'xwind'
import Link from 'next/link'
import { useAppContext } from '~/components/context/AppContext'
import { remove } from '~/components/products/compare'

const CompareList = () => {
  const shared = useAppContext()

  return (
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
  )
}

export default CompareList
