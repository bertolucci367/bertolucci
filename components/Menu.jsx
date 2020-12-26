import xw from 'xwind'
import Link from 'next/link'

const menu = [
  { name: 'Produtos', url: '/' },
  { name: 'Ambientes', url: '/' },
  { name: 'Sobre', url: '/' },
  { name: 'Imprensa', url: '/' },
  { name: 'Blog', url: '/' },
  { name: 'Contato', url: '/contact' },
]

const Menu = () => (
  <nav css={xw`text-18px`}>
    <ul css={xw`lg:flex justify-around`}>
      {menu.map((m, i) => (
        <li key={i}>
          <Link href={m.url}>
            <a css={xw`block py-4 font-bold px-4`}>{m.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
export default Menu
