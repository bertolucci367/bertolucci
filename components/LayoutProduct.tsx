import Layout from './Layout'
import { subMenuProducts } from './products/submenu'

const LayoutProduct = ({ children }) => {
  return <Layout subMenu={subMenuProducts}>{children}</Layout>
}

export default LayoutProduct
