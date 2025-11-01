import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../Routes";
import text from "../languages/en.json";

const Logo = ({
    logoContainerCls=''
}) => {
  return (
    <Link to={routes.home} className={`flex ${logoContainerCls}`}>
      <h1 className="logo w-24 italic">{text.navlogotext}</h1>
      <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
    </Link>
  );
};

export default Logo;
