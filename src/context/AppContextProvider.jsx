import React from "react";
import ShopContextProvider from "./ShopContextProvider";
import { ModalProvider } from "./DialogContext";

const AppContextProvider = ({ children }) => {
  return (
    <ShopContextProvider>
      <ModalProvider>{children}</ModalProvider>
    </ShopContextProvider>
  );
};

export default AppContextProvider;
