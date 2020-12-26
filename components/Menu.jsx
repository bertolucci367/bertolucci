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

const style = {
  gridArea: 'm',
}

const Menu = () => (
  <nav css={xw`text-18px`} style={style}>
    <ul>
      {menu.map((m, i) => (
        <li key={i}>
          <Link href={m.url}>
            <a
              css={xw`block mt-4 lg:inline-block lg:mt-0 hover:text-black mr-4`}
            >
              {m.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
export default Menu
