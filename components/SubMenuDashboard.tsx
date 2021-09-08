import { MenuItem } from '~/components/products/MenuItem'
import { signOut, useSession } from 'next-auth/client'
import { IoIosLogOut } from 'react-icons/io'

export const links = [
  { path: '/area-do-cliente/fale-com-consultor', label: 'fale com consultor' },
  { path: '/area-do-cliente/orcamento', label: 'orçamento' },
  { path: '/area-do-cliente/catalogo', label: 'catálogo' },
  { path: '/area-do-cliente/minha-conta', label: 'minha conta' },
]

const SubMenuDashboard = () => {
  const [session] = useSession()

  return (
    <nav>
      {session && (
        <ul className={`lg:flex lg:flex-row lg:justify-center`}>
          {links.map(l => (
            <MenuItem key={l.path} name={l.label} path={l.path} />
          ))}
          <li className="mx-2 my-10 lg:my-0 lg:mt-[3px]">
            <button
              className="flex items-center font-medium hover:underline"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
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
