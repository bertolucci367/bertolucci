import SubMenuProduct from '~/components/products/SubMenuProduct'
import SubMenuMaterials from '~/components/SubMenuMaterials'
import SubMenuAbout from '~/components/SubMenuAbout'

const SubMenu = ({ active }) => {
  const isMaterialsPage =
    /^\/materias(?:\/|$)/.test(active) ||
    /^\/produtos\/materiais(?:\/|$)/.test(active)
  const activePath = active.split('?')[0]
  const shouldShowProductSubMenu =
    activePath === '/produtos' ||
    /^\/produtos\/tipologias(?:\/|$)/.test(activePath)

  return (
    <div className={`flex max-h-full overflow-y-auto w-full lg:justify-center`}>
      {isMaterialsPage && <SubMenuMaterials />}
      {shouldShowProductSubMenu && <SubMenuProduct />}
      {/^\/fabrica/.test(active) && <SubMenuAbout />}
    </div>
  )
}

export default SubMenu
