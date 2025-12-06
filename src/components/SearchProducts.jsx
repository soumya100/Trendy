import { useContext, useState } from "react";
import { searchData } from "../assets/assets";
import CustomInputField from "../common/InputSearchField";
import { ShopContext } from "../context/ShopContext";
import { redirect, useNavigate } from "react-router-dom";

const SearchProducts = ({ searchRef, closeModal }) => {
  const { products } = useContext(ShopContext);
  const [searchProducts, setSearchProducts] = useState("");
  const navigate=useNavigate()

  //function to handle search products
  const handleChange = (e) => {
    setSearchProducts(e.target.value);
  };

  //function to handle redirection to a page
  const handleRedirect=(link)=>{
    navigate(link)
    closeModal()
  }

  return (
    <div className="w-full max-h-full flex flex-col gap-4 overFlow-x-none">
      <CustomInputField
        id="searchBox"
        label="Search"
        placeholder="Search..."
        inputRef={searchRef}
        autoFocus
        variant="filled"
        width="100%"
        value={searchProducts}
        onChange={handleChange}
      />

      {/* Animated List */}
      <div className="overflow-y-auto max-h-[450px] pr-1 space-y-4 overflow-x-hidden">
        {searchData.map((item, idx) => (
          <div
            key={idx}
            className="
          flex items-center gap-5 p-4 rounded-2xl cursor-pointer
          bg-white/70 backdrop-blur-sm border border-gray-200
          shadow-[0_4px_20px_rgba(0,0,0,0.05)]
          hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]
          transition-all duration-300 ease-out transform 
          hover:scale-[1.02] hover:bg-white
          animate-fade-slide
        "
            style={{ animationDelay: `${idx * 0.05}s` }}
            onClick={()=>handleRedirect(item.href)}
          >
            {/* Image Wrapper */}
            <div
              className="
          w-16 h-16 rounded-xl bg-gray-50 
          flex items-center justify-center overflow-hidden
          shadow-inner
        ">
              <img
                src={item.image}
                alt={item.name}
                className="
              max-w-full max-h-full object-contain
              transition-transform duration-300
              group-hover:scale-110
            "
              />
            </div>

            {/* Text */}
            <p className="text-lg font-semibold text-gray-800 tracking-wide">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
