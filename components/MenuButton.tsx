const MenuButton = ({ children }) => {
  return (
    <div className={`pr-6 flex items-center justify-end lg:hidden col-start-3`}>
      {children}
    </div>
  )
}

export default MenuButton
