import { MenuItem } from '~/components/products/MenuItem'
import { IoIosLogOut } from 'react-icons/io'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

export const links = [
  { path: '/area-do-cliente/fale-com-consultor', label: 'fale com consultor' },
  { path: '/area-do-cliente/catalogo', label: 'catálogo' },
  { path: '/area-do-cliente/minha-conta', label: 'minha conta' },
]

const SubMenuDashboard = () => {
  const { signOut } = useContext(AuthContext)

  return (
    <nav>
      {true && (
        <ul className={`lg:flex lg:flex-row lg:justify-center`}>
          {links.map(l => (
            <MenuItem key={l.path} name={l.label} path={l.path} />
          ))}
          <li className="mx-2 my-10 lg:my-0 lg:mt-[3px]">
            <button
              className="flex items-center font-medium hover:underline"
              onClick={() => signOut()}
            >
              sair <IoIosLogOut className="ml-2" />
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default SubMenuDashboard
