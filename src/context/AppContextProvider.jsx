import React from 'react'
import ShopContextProvider from './ShopContextProvider'

const AppContextProvider = ({children}) => {
  return (
    <ShopContextProvider>
      {children}
    </ShopContextProvider>
  )
}

export default AppContextProvider
