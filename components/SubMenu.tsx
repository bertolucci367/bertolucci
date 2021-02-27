import useSWR from 'swr'
import fetcher from '~/components/libs/fetcher'
import SubMenuProduct from '~/components/products/SubMenuProduct'

const SubMenu = () => {
  const { data, error } = useSWR<any[]>(`/api/sub-menus`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <SubMenuProduct data={data} />
    </>
  )
}

export default SubMenu
