import xw from 'xwind'
import SubMenuProduct from '~/components/products/SubMenuProduct'
import SubMenuAbout from '~/components/SubMenuAbout'

const SubMenu = ({ active }) => {
  return (
    <div css={xw`flex max-h-full overflow-y-auto w-full lg:justify-center`}>
      {/^\/produtos/.test(active) && <SubMenuProduct />}
      {/^\/sobre/.test(active) && <SubMenuAbout />}
    </div>
  )
}

export default SubMenu
