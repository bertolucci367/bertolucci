import xw from 'xwind'
import Link from './Link'
import SubMenu from './SubMenu'

const menu = [
  { name: 'Produtos', url: '/produtos' },
  { name: 'Ambientes', url: '/ambientes' },
  { name: 'Sobre', url: '/about' },
  { name: 'Imprensa', url: '/news' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contato', url: '/contact' },
]

const Menu = () => (
  <>
    <nav css={xw`text-18px leading-none mr-8 lg:mr-0`}>
      <ul css={xw`lg:flex lg:justify-around`}>
        {menu.map((m, i) => (
          <li key={i}>
            <Link href={m.url}>
              <a
                css={xw`block font-bold mx-4 pb-1 my-10 lg:my-3 hover:cursor-pointer`}
              >
                {m.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <SubMenu />
  </>
)
export default Menu
