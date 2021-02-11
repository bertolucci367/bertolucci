import { useAppContext } from '~/components/context/AppContext'
import xw from 'xwind'
import Link from 'next/link'

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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CompareList
