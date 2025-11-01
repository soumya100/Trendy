import React, { useMemo } from "react";
import Logo from "../common/Logo";
import text from "../languages/en.json";
import { routes } from "../Routes";

const Footer = () => {

    const footerLinks= useMemo(() => [
        { name: text.navbarmenu.home, path: routes.home },
        { name: text.navbarmenu.about, path: routes.about },
        { name: text.footerLinks.delivery, path: '#' },
        { name: text.footerLinks.privacypolicy, path: '#' },
      ], []);

      const contactInfo = useMemo(() => [
         text.phoneno ,
        text.email
      ], []);

  return (
    <footer className="px-10">
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <Logo logoContainerCls="mb-5" />
        <p className="w-full md:2/3 text-gray-600">
         {text.footerdescriptionText}
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
           {
            footerLinks.map((link, idx) => (
                <li key={idx} className="cursor-pointer hover:text-black">
                    {link.name.toUpperCase()}
                </li>
            ))
           }
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">
           {text.getintouch.toUpperCase()}
        </p>
        <ul className="flex flex-col gap-1 text-gray-600 ">
          {contactInfo.map((contact, idx)=> <li key={idx} className="cursor-pointer hover:text-black">
            {contact}
           </li>)}
        </ul>
      </div>
    </div>
           <div>
            <hr />
            <p className="py-5 text-sm text-center">
                &copy; {text.copyrightyear} {text.navlogotext.toLowerCase()}.com - {text.allrightsreserved}
            </p>
           </div>
    </footer>
  );
};

export default Footer;
