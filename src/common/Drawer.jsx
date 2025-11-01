import React from "react";
import { assets } from "../assets/assets";

export default function Drawer({
  children,
  isOpen,
  setIsOpen,
  header,
  extraBackIconClasses = "",
  backIcon = (
    <img
      src={assets.dropdown_icon}
      className="h-3 w-3 min-w-3 cursor-pointer rotate-180"
      alt="BackIcon"
    />
  ),
  headerCls='p-4 font-bold text-lg'
}) {
  return (
    <main
      className={
        "fixed overflow-hidden scroll-auto z-10 bg-white bg-opacity-25 inset-0 transform ease-in-out h-screen" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform" +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
          <header className={`p-4 ${headerCls}`}>
            <div
              className="flex gap-2 items-center h-full"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <div
                className={`border-gray-400 p-1 cursor-pointer ${extraBackIconClasses}`}
              >
                {backIcon}
              </div>
              {header}
            </div>
          </header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
