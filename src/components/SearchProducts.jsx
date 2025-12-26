import { useContext, useState, useEffect, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchData } from "../assets/assets";
import text from '../languages/en.json'
import InputSearchField from "../common/InputSearchField";

const SearchProducts = ({ searchRef, closeModal }) => {
  const { products } = useContext(ShopContext);
  const [searchProducts, setSearchProducts] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ----------------------------------------------------------
      READ SEARCH QUERY FROM URL PARAMS
  ---------------------------------------------------------- */
  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearchProducts(q);
  }, [searchParams]);

  /* ----------------------------------------------------------
      HANDLE INPUT CHANGE
  ---------------------------------------------------------- */
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchProducts(value);
  };

  /* ----------------------------------------------------------
      FILTER PRODUCTS LIVE
  ---------------------------------------------------------- */
  const filteredProducts = useMemo(() => {
    if (!searchProducts.trim()) return [];

    return products.filter((item) =>
      item.name.toLowerCase().includes(searchProducts.toLowerCase())
    );
  }, [searchProducts, products]);

  /* ----------------------------------------------------------
      REDIRECT HANDLER
  ---------------------------------------------------------- */
  const handleRedirect = (link) => {
    navigate(link);
    closeModal();
  };

  const handleProductRedirect = (id) => {
    navigate(`/product/${id}`);
    closeModal();
  };

  return (
    <div className="w-full max-h-full flex flex-col gap-4 overflow-x-hidden">
      {/* ✅ SEARCH INPUT */}
      <InputSearchField
        inputRef={searchRef}
        id="searchBox"
        label={text.search.label}
        placeholder={text.search.placeholder}
        autoFocus
        variant="filled"
        width="100%"
        value={searchProducts}
        onChange={handleChange}
        className="p-2"
      />

      {/* ✅ RESULTS */}
      <div className="overflow-y-auto max-h-[420px] pr-1 space-y-4">

        {/* ✅ IF USER IS TYPING → SHOW PRODUCTS */}
        {searchProducts.trim() &&
          filteredProducts.map((item, idx) => (
            <div
              key={item._id}
              className="
                flex items-center gap-5 p-4 rounded-2xl cursor-pointer
                bg-white/70 backdrop-blur-sm border border-gray-200
                shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]
                transition-all duration-300 ease-out transform 
                hover:scale-[1.02]
              "
              onClick={() => handleProductRedirect(item._id)}
            >
              <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
            </div>
          ))}

        {/* ✅ IF EMPTY SEARCH → SHOW QUICK LINKS */}
        {!searchProducts.trim() &&
          searchData.map((item, idx) => (
            <div
              key={idx}
              className="
                flex items-center gap-5 p-4 rounded-2xl cursor-pointer
                bg-white/70 backdrop-blur-sm border border-gray-200
                shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]
                transition-all duration-300 ease-out
              "
              onClick={() => handleRedirect(item.href)}
            >
              <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <p className="text-lg font-semibold text-gray-800">
                {item.name}
              </p>
            </div>
          ))}

        {/* ✅ NO MATCH */}
        {searchProducts.trim() && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            {text.productsNotFound}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
