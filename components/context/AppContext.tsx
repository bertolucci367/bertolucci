import { createContext, useContext } from 'react'

const sharedState = {
  goToLines: true,
  productClosePath: '/produtos',
}

const AppContext = createContext(sharedState)

export function AppWrapper({ children }) {
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
