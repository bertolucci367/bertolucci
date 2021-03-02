import { MenuItem } from '~/components/products/MenuItem'
import xw from 'xwind'

const SubMenuAbout = () => {
  return (
    <nav>
      <ul css={xw`lg:flex lg:flex-row lg:justify-center`}>
        <MenuItem name="história" path="/sobre#history" />
        <MenuItem name="produção" path="/sobre#production" />
      </ul>
    </nav>
  )
}

export default SubMenuAbout
