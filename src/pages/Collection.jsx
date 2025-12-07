import React, { useCallback, useEffect, useMemo, useState } from "react";

import { List } from "react-window";
import { assets } from "../assets/assets";

import PaginatedGallery from "../common/pagination";
import Title from "../common/Title";
import FilterCollection from "../components/collection/FilterCollection";
import ProductSort from "../components/collection/ProductSort";

import { ShopContext } from "../context/ShopContext";
import text from "../languages/en.json";
import { useSearchParams } from "react-router-dom";
import CustomInputField from "../common/InputSearchField";
import useDebounce from "../hooks/useDebounce";

export default function Collection() {
  const { products } = React.useContext(ShopContext);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);

  const [searchProducts, setSearchProducts] = useState("");
  const debouncedSearch = useDebounce(searchProducts, 300);

  const [searchParams, setSearchParams] = useSearchParams();

  /* ------------------------------
      SAFE URL UPDATE (debounced)
  ------------------------------ */
  useEffect(() => {
    const params = {};

    if (category.length) params.category = category.join(",");
    if (subCategory.length) params.subCategory = subCategory.join(",");
    if (sortType) params.sort = sortType;
    if (debouncedSearch.trim()) params.search = debouncedSearch;

    setSearchParams(params, { replace: true });
  }, [category, subCategory, sortType, debouncedSearch, setSearchParams]);

  /* ------------------------------
      FILTER OPTIONS
  ------------------------------ */
  const categoryFilters = useMemo(
    () => [
      { label: text.categoriesinnotfoundpage.men, value: "men" },
      { label: text.categoriesinnotfoundpage.women, value: "women" },
      { label: text.categoriesinnotfoundpage.kids, value: "kids" },
    ],
    []
  );

  const typeFilters = useMemo(
    () => [
      { label: text.types.topwear, value: "topwear" },
      { label: text.types.bottomwear, value: "bottomwear" },
      { label: text.types.winterwear, value: "winterwear" },
    ],
    []
  );

  const sortOptions = [
    { label: text.sortoptions.relevancelabel, value: "relevant" },
    { label: text.sortoptions.lowhighlabel, value: "lowhigh" },
    { label: text.sortoptions.hightolabel, value: "highlow" },
  ];

  /* ------------------------------
      TOGGLE FILTER
  ------------------------------ */
  const toggleFilter = useCallback(
    (value, setter) => {
      const v = value.toLowerCase();

      setter((prev) =>
        prev.includes(v)
          ? prev.filter((x) => x !== v)
          : [...prev, v]
      );
    },
    []
  );

  /* ------------------------------
      FILTER + SORT PRODUCTS
  ------------------------------ */
  const filteredProducts = useMemo(() => {
    let result = products;

    if (category.length) {
      result = result.filter((p) =>
        category.includes(p.category.toLowerCase())
      );
    }

    if (subCategory.length) {
      result = result.filter((p) =>
        subCategory.includes(p.subCategory.toLowerCase())
      );
    }

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
    }

    if (sortType === "lowhigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortType === "highlow") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, subCategory, sortType, debouncedSearch]);

  /* ------------------------------
      URL → STATE SYNC (Load on mount)
  ------------------------------ */
  useEffect(() => {
  const cat = searchParams.get("category");
  const sub = searchParams.get("subCategory");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");

  setCategory(cat ? cat.split(",").map((x) => x.toLowerCase()) : []);
  setSubCategory(sub ? sub.split(",").map((x) => x.toLowerCase()) : []);
  if (sort) setSortType(sort);
  setSearchProducts(search || "");
}, [searchParams.toString()]);


  /* ------------------------------
      CLOSE FILTER ON CHANGE (MOBILE)
  ------------------------------ */
  useEffect(() => {
    setShowFilter(false);
  }, [category, subCategory, sortType]);

  /* ------------------------------
      RENDER
  ------------------------------ */
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* LEFT FILTER */}
      <div className="min-w-60">

        <p
          onClick={() => setShowFilter((prev) => !prev)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 sm:hidden"
        >
          {text.filterstext.toUpperCase()}
          <img
            className={`h-3 transition-transform ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown-icon"
          />
        </p>

        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>

          <FilterCollection
            title={text.categories.toUpperCase()}
            filters={categoryFilters}
            selected={category}
            handleChange={(e) => toggleFilter(e.target.value, setCategory)}
          />

          <FilterCollection
            title={text.typeTitle.toUpperCase()}
            filters={typeFilters}
            selected={subCategory}
            extraContainerCls={"!my-5"}
            handleChange={(e) => toggleFilter(e.target.value, setSubCategory)}
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1">

        {/* SEARCH */}
        <div className="mb-4">
          <CustomInputField
            id="collectionSearch"
            label={text.search.label}
            placeholder={text.search.placeholder}
            value={searchProducts}
            onChange={(e) => setSearchProducts(e.target.value)}
            variant="filled"
            width="100%"
          />
        </div>

        {/* SORT + TITLE */}
        <div className="flex justify-between text-sm sm:text-2xl mb-4 items-center">
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

        {/* PRODUCT LIST */}
        {filteredProducts.length > 200 ? (
          <List
            height={600}
            itemCount={filteredProducts.length}
            itemSize={420}
            width="100%"
          >
            {({ index, style }) => (
              <div style={style} className="p-2">
                <PaginatedGallery
                  data={[filteredProducts[index]]}
                  itemsPerPage={1}
                  disablePagination
                />
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
