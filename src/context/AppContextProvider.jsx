import React from 'react'
import ShopContextProvider from './ShopContext'

const AppContextProvider = ({children}) => {
  return (
    <ShopContextProvider>
      {children}
    </ShopContextProvider>
  )
}

export default AppContextProvider
