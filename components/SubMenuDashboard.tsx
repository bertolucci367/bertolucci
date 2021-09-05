import { MenuItem } from '~/components/products/MenuItem'

export const links = [
  { path: '/fale-com-consultor', label: 'fale com consultor' },
  { path: '/orcamento', label: 'orçamento' },
  { path: '/catalogo', label: 'catálogo' },
  { path: '/minha-conta', label: 'minha conta' },
]

const SubMenuDashboard = () => {
  return (
    <nav>
      <ul className={`lg:flex lg:flex-row lg:justify-center`}>
        {links.map(l => (
          <MenuItem key={l.path} name={l.label} path={l.path} />
        ))}
      </ul>
    </nav>
  )
}

export default SubMenuDashboard
