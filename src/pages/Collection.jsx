import React, { useCallback, useEffect, useMemo, useState } from "react";
import { List } from "react-window";
import { assets } from "../assets/assets";
import PaginatedGallery from "../common/pagination";
import Title from "../common/Title";
import FilterCollection from "../components/collection/FilterCollection";
import ProductSort from "../components/collection/ProductSort";
import { ShopContext } from "../context/ShopContext";
import text from "../languages/en.json";

export default function Collection() {
  const { products } = React.useContext(ShopContext);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState(text.sortoptions.relevant);
  const [showFilter, setShowFilter] = useState(false); // ✅ restore mobile filter toggle

  // ✅ Memo filters
  const categoryFilters = useMemo(
    () =>
      [
        text.categoriesinnotfoundpage.men,
        text.categoriesinnotfoundpage.women,
        text.categoriesinnotfoundpage.kids,
      ].map((item) => ({ label: item, value: item })),
    []
  );

  const typeFilters = useMemo(
    () =>
      [text.types.topwear, text.types.bottomwear, text.types.winterwear].map(
        (item) => ({ label: item, value: item })
      ),
    []
  );

  //sort options
  const sortOptions = React.useMemo(() => {
    const { sortoptions } = text;

    return [
      {
        label: `${sortoptions.sortby} ${sortoptions.relevancelabel}`,
        value: sortoptions.relevant,
      },
      {
        label: `${sortoptions.sortby} ${sortoptions.lowhighlabel}`,
        value: sortoptions.lowhigh,
      },
      {
        label: `${sortoptions.sortby} ${sortoptions.hightolabel}`,
        value: sortoptions.highlow,
      },
    ];
  }, [text.sortoptions]);

  // Toggle filter
  const toggleFilter = useCallback((value, setter) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  }, []);

  // Filter + Sort
  const filteredProducts = useMemo(() => {
    let result = products;

    if (category.length) {
      result = result.filter((p) => category.includes(p.category));
    }

    if (subCategory.length) {
      result = result.filter((p) => subCategory.includes(p.subCategory));
    }

    if (sortType === text.sortoptions.lowhigh) {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortType === text.sortoptions.highlow) {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, subCategory, sortType]);

  // Reset page on filter change
  useEffect(() => {
    setShowFilter(false);
  }, [category, subCategory, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Left Filter Sidebar */}
      <div className="min-w-60">
        {/* Mobile Filter Toggle Button */}
        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 sm:hidden"
        >
          {text.filterstext.toUpperCase()}
          <img
            className={`h-3 transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt="toggle filters"
          />
        </p>

        {/* Desktop always visible, Mobile collapsible */}
        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          <FilterCollection
            title={text.categories.toUpperCase()}
            filters={categoryFilters}
            handleChange={(e) => toggleFilter(e.target.value, setCategory)}
          />

          <FilterCollection
            title={text.typeTitle.toUpperCase()}
            filters={typeFilters}
            extraContainerCls={"!my-5"}
            handleChange={(e) => toggleFilter(e.target.value, setSubCategory)}
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title
            text1={text.all.toUpperCase()}
            text2={text.navbarmenu.collections.toUpperCase()}
          />

          <ProductSort
            sortType={sortType}
            sortOptions={sortOptions}
            handleSortTypeChange={(e) => setSortType(e.target.value)}
          />
        </div>

        {/* Product List with Virtualization for large data */}
        {filteredProducts.length > 200 ? (
          <List
            height={600}
            itemCount={filteredProducts.length}
            itemSize={420} // adjust to match your product card height
            width={"100%"}
          >
            {({ index, style }) => (
              <div style={style} className="p-2">
                {/* Use the same component you use normally inside PaginatedGallery */}
                {/* just render one product tile here */}
                {(() => {
                  const product = filteredProducts[index];
                  return (
                    <PaginatedGallery
                      data={[product]}
                      itemsPerPage={1}
                      disablePagination
                    />
                  );
                })()}
              </div>
            )}
          </List>
        ) : (
          <PaginatedGallery data={filteredProducts} itemsPerPage={8} />
        )}
      </div>
    </div>
  );
}
