import SubMenuProduct from '~/components/products/SubMenuProduct'
import SubMenuAbout from '~/components/SubMenuAbout'
import SubMenuDashboard from '~/components/SubMenuDashboard'

const SubMenu = ({ active }) => {
  return (
    <div className={`flex max-h-full overflow-y-auto w-full lg:justify-center`}>
      {/^\/produtos/.test(active) && <SubMenuProduct />}
      {/^\/fabrica/.test(active) && <SubMenuAbout />}
      {/^\/dashboard/.test(active) && <SubMenuDashboard />}
    </div>
  )
}

export default SubMenu
