const MenuButton = ({ children }) => {
  return (
    <div className={`flex items-center justify-end lg:hidden col-start-3`}>
      {children}
    </div>
  )
}

export default MenuButton
