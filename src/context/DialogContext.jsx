// DialogContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import Dialog from "../common/Dialog";

const DialogContext = createContext();

export const useModal = () => useContext(DialogContext);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: null,
    footerActions: null,
    resolver: null,
    options: {},
  });

  const openModal = useCallback((config = {}) => {
    const { title, content, footerActions, resolver, ...options } = config;

    setModalState({
      isOpen: true,
      title: title || "",
      content: content || null,
      footerActions: footerActions || null,
      resolver: resolver || null,
      options,
    });
  }, []);

  const closeModal = useCallback((result = null) => {
    setModalState((prev) => {
      if (prev.resolver) prev.resolver(result);
      return { ...prev, isOpen: false, resolver: null };
    });
  }, []);

  const value = {
    openModal,
    closeModal,
    isOpen: modalState.isOpen,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}

      <Dialog
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        footerActions={({ close }) =>
          typeof modalState.footerActions === "function"
            ? modalState.footerActions({ close })
            : modalState.footerActions
        }
        initialFocusRef={modalState.initialFocusRef} // <-- PASS IT FORWARD
        {...modalState.options}
      >
        {modalState.content}
      </Dialog>
    </DialogContext.Provider>
  );
};
