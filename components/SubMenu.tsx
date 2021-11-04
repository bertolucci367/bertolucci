import SubMenuProduct from '~/components/products/SubMenuProduct'
import SubMenuAbout from '~/components/SubMenuAbout'
import SubMenuDashboard from '~/components/SubMenuDashboard'
import SubMenuAdmin from '~/components/SubMenuAdmin'

const SubMenu = ({ active }) => {
  return (
    <div className={`flex max-h-full overflow-y-auto w-full lg:justify-center`}>
      {/^\/produtos/.test(active) && <SubMenuProduct />}
      {/^\/fabrica/.test(active) && <SubMenuAbout />}
      {/^\/area-do-cliente/.test(active) && <SubMenuDashboard />}
      {/^\/admin/.test(active) && <SubMenuAdmin />}
    </div>
  )
}

export default SubMenu
