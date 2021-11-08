import { MenuItem } from '~/components/products/MenuItem'
import { IoIosLogOut } from 'react-icons/io'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Dashboard from 'pages/dashboard'

type User = {
  id: string
  name: string
  email: string
  role: Array<string>
}

const links = [
  { path: '/dashboard/users', label: 'usuários', role: ['seller'] },
  {
    path: '/dashboard/fale-com-consultor',
    label: 'fale com consultor',
    role: ['user'],
  },
  { path: '/dashboard/catalogo', label: 'catálogo', role: ['user', 'seller'] },
  {
    path: '/dashboard/minha-conta',
    label: 'minha conta',
    role: ['user', 'seller'],
  },
]

export const linksPermissions = (user: User) => {
  if (!user) {
    return []
  }

  return links.filter(l => {
    const role = user.role.length > 0 ? user.role : ['user']
    return l.role.some(r => role.includes(r))
  })
}

const SubMenuDashboard = () => {
  const { signOut, user } = useContext(AuthContext)

  return (
    <nav>
      {user && (
        <ul className={`lg:flex lg:flex-row lg:justify-center`}>
          {linksPermissions(user).map(l => (
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
