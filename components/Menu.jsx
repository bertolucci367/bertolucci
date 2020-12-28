import xw from 'xwind'
import Link from 'next/link'

const menu = [
  { name: 'Produtos', url: '/products' },
  { name: 'Ambientes', url: '/' },
  { name: 'Sobre', url: '/about' },
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
            <a css={xw`block font-bold px-4 py-3 hover:cursor-pointer`}>
              {m.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
export default Menu
