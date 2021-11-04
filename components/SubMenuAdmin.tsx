import { MenuItem } from '~/components/products/MenuItem'
import { signOut, useSession } from 'next-auth/react'
import { IoIosLogOut } from 'react-icons/io'

const SubMenuDashboard = () => {
  const { data: session, status } = useSession()

  return (
    <nav>
      {status == 'authenticated' && session?.role == 'admin' && (
        <ul className={`lg:flex lg:flex-row lg:justify-center`}>
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
