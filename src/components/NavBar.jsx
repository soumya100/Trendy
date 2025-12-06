import React from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import Drawer from "../common/Drawer.jsx";
import { routes } from "../Routes/index.js";
import Logo from "../common/Logo.jsx";
import text from "../languages/en.json";
import { useModal } from "../context/DialogContext.jsx";
import SearchProducts from "./SearchProducts.jsx";

const NavBar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const { openModal, closeModal } = useModal();
  const searchRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // detect scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navArray = React.useMemo(
    () => [
      { name: text.navbarmenu.home, path: routes.home },
      { name: text.navbarmenu.collections, path: routes.collection },
      { name: text.navbarmenu.about, path: routes.about },
      { name: text.navbarmenu.contact, path: routes.contact },
    ],
    []
  );

  const profileMenu = [
    text.profilemenu.profile,
    text.profilemenu.orders,
    text.profilemenu.logout,
  ];

  //handleClose for drawer
  const handleHamDrawerClose = () => {
    setIsVisible(false);
  };

  //search handler
  const openSearchModal = () => {
    openModal({
      title: "Search Products",
      content: (
       <SearchProducts searchRef={searchRef} closeModal={closeModal}/>
      ),
      footerActions: ({ close }) => (
        <button
          onClick={close}
          className="px-4 py-2 bg-black text-white rounded cursor-pointer"
        >
          Close
        </button>
      ),
      initialFocusRef: searchRef, 
      size: "lg",
      placement: "top",
    });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 px-10 ${
        scrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between py-5 font-medium w-full">
        <Logo />
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          {navArray.map((navEl, idx) => (
            <NavLink
              to={navEl.path}
              key={idx}
              className="flex flex-col items-center gap-1"
            >
              <p>{navEl.name.toUpperCase()}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          ))}
        </ul>
        <div className="flex items-center gap-3 sm:gap-6">
          <div
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
            onClick={openSearchModal}
          >
            <img src={assets.search_icon} className="w-5" alt="search" />
          </div>
          <div className="group relative hover:bg-slate-200 p-2 rounded-full cursor-pointer">
            <img
              src={assets.profile_icon}
              alt="profile icon"
              className="w-5 min-w-5"
            />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {profileMenu.map((items, i) => (
                  <p key={i} className="cursor-pointer hover:text-black">
                    {items}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="hover:bg-slate-200 p-2 rounded-full cursor-pointer">
            <Link to={routes.cart} className="relative">
              <img
                src={assets.cart_icon}
                className="w-5 cursor-pointer min-w-5 h-5"
                alt="cart"
              />
              <p className="absolute bottom-[-5px] right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                10
              </p>
            </Link>
          </div>

          <img
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="menu"
            onClick={() => setIsVisible(true)}
          />
        </div>
        <Drawer
          isOpen={isVisible}
          onClose={handleHamDrawerClose}
          header={<Logo />}
        >
          <div className="flex flex-col gap-6 px-4">
            {navArray.map((navEl, idx) => (
              <NavLink
                to={navEl.path}
                key={idx}
                className="flex flex-col items-center gap-1 text-slate-400 hover:text-black"
                onClick={handleHamDrawerClose}
              >
                <p>{navEl.name.toUpperCase()}</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden hover:text-gray-400" />
              </NavLink>
            ))}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
