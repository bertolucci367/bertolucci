import { createContext, useContext, useState } from 'react'

const sharedState = {
  goToLines: true,
  productClosePath: '/produtos',
  compare: [],
  menuOpen: '',
  menuIsOpen: false,
  addData: (obj: any) => {},
}

const AppContext = createContext(sharedState)

export function AppWrapper({ children }) {
  const [data, setData] = useState(sharedState)

  return (
    <AppContext.Provider
      value={{
        ...data,
        addData: obj =>
          setData((prev: any) => {
            return { ...prev, ...obj }
          }),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
