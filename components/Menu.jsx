import xw from 'xwind'
import Link from './Link'

const menu = [
  { name: 'Produtos', url: '/produtos' },
  { name: 'Ambientes', url: '/ambientes' },
  { name: 'Sobre', url: '/about' },
  { name: 'Imprensa', url: '/news' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contato', url: '/contact' },
]

const Menu = () => (
  <nav css={xw`text-18px leading-none`}>
    <ul css={xw`lg:flex justify-around`}>
      {menu.map((m, i) => (
        <li key={i}>
          <Link href={m.url}>
            <a css={xw`block font-bold mx-4 pb-1 my-3 hover:cursor-pointer`}>
              {m.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
export default Menu
