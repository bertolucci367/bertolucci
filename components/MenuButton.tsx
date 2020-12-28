import xw from 'xwind'

const MenuButton = ({ children }) => {
  return (
    <div css={xw`pr-6 flex items-center justify-end lg:hidden col-start-3`}>
      {children}
    </div>
  )
}

export default MenuButton
