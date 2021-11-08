import { MenuItem } from '~/components/products/MenuItem'
import { IoIosLogOut } from 'react-icons/io'

const SubMenuDashboard = () => {
  return (
    <nav>
      {true && (
        <ul className={`lg:flex lg:flex-row lg:justify-center`}>
          <li className="mx-2 my-10 lg:my-0 lg:mt-[3px]">
            <button className="flex items-center font-medium hover:underline">
              sair <IoIosLogOut className="ml-2" />
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default SubMenuDashboard
