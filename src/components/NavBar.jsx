import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import Drawer from "../common/Drawer";

const NavBar = () => {
  const navArray = React.useMemo(
    () => [
      { name: "HOME", path: "/" },
      { name: "COLLECTION", path: "/collection" },
      { name: "ABOUT", path: "/about" },
      { name: "CONTACT", path: "/contact" },
    ],
    []
  );

  const profileMenu = ["Profile", "Orders", "Logout"];

  const [isVisible, setIsVisible] = React.useState(false);

  //handleClose for drawer
  const handleHamDrawerClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* <img src={assets.logo2} className='w-36' alt="Trendy"/> */}
      <Link to={'/'} className="flex">
        <h1 className="logo w-24 italic">TRENDY</h1>
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navArray.map((navEl, idx) => (
          <NavLink
            to={navEl.path}
            key={idx}
            className="flex flex-col items-center gap-1"
          >
            <p>{navEl.name}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <div className="hover:bg-slate-200 p-2 rounded-full cursor-pointer">
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
          <Link to="/cart" className="relative">
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
        setIsOpen={setIsVisible}
        header={
            <h1 className="logo w-36 italic">TRENDY</h1>
        }
      >
        <div className="flex flex-col gap-6 px-4">
          {navArray.map((navEl, idx) => (
            <NavLink
              to={navEl.path}
              key={idx}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-black"
              onClick={handleHamDrawerClose}
            >
              <p>{navEl.name}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden hover:text-gray-400" />
            </NavLink>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default NavBar;
