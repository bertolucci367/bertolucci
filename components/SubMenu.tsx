import SubMenuProduct from '~/components/products/SubMenuProduct'
import SubMenuMaterials from '~/components/SubMenuMaterials'
import SubMenuAbout from '~/components/SubMenuAbout'

const SubMenu = ({ active }) => {
  const isMaterialsPage =
    /^\/materias(?:\/|$)/.test(active) ||
    /^\/produtos\/materiais(?:\/|$)/.test(active)

  return (
    <div className={`flex max-h-full overflow-y-auto w-full lg:justify-center`}>
      {isMaterialsPage && <SubMenuMaterials />}
      {!isMaterialsPage && /^\/produtos/.test(active) && <SubMenuProduct />}
      {/^\/fabrica/.test(active) && <SubMenuAbout />}
    </div>
  )
}

export default SubMenu
