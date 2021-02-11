import Layout from './Layout'
import { subMenuProducts } from '~/components/products/submenu'
import CompareList from '~/components/products/CompareList'
import xw from 'xwind'

const LayoutProduct = ({ children }) => {
  return (
    <Layout subMenu={subMenuProducts}>
      <div css={[xw`col-start-1 col-end-2 row-start-2 row-end-2 h-full`]}>
        <div css={[xw`sticky text-center`, `top: calc(50% - 45px);`]}>
          <CompareList />
        </div>
      </div>
      <div css={[xw`col-start-2 col-end-3 row-start-2 row-end-2`]}>
        {children}
      </div>
    </Layout>
  )
}

export default LayoutProduct
