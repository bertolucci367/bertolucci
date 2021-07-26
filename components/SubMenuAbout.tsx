import { MenuItem } from '~/components/products/MenuItem'

const SubMenuAbout = () => {
  return (
    <nav>
      <ul className={`lg:flex lg:flex-row lg:justify-center`}>
        <MenuItem name="história" path="/fabrica#historia" />
        <MenuItem name="produção" path="/fabrica#producao" />
      </ul>
    </nav>
  )
}

export default SubMenuAbout
