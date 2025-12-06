import React, { useCallback, useEffect, useMemo, useState } from "react";

import { List } from "react-window";
import { assets, products as productList } from "../assets/assets"; // FIXED IMPORT

import PaginatedGallery from "../common/pagination";
import Title from "../common/Title";
import FilterCollection from "../components/collection/FilterCollection";
import ProductSort from "../components/collection/ProductSort";

import { ShopContext } from "../context/ShopContext";
import text from "../languages/en.json"; // FIXED IMPORT
import { useSearchParams } from "react-router-dom";

export default function Collection() {
  const { products } = React.useContext(ShopContext); // Your products come from context

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  /* ------------------------------
      UPDATE URL WHEN FILTER CHANGES
  ------------------------------ */
  const updateURL = useCallback(
    (catList, subList, sort) => {
      const params = {};

      if (catList.length) params.category = catList.join(",");
      if (subList.length) params.subCategory = subList.join(",");
      if (sort) params.sort = sort;

      setSearchParams(params);
    },
    [setSearchParams]
  );

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
    (value, setter, type) => {
      const v = value.toLowerCase();

      setter((prev) => {
        const newList = prev.includes(v)
          ? prev.filter((x) => x !== v)
          : [...prev, v];

        updateURL(
          type === "category" ? newList : category,
          type === "sub" ? newList : subCategory,
          sortType
        );

        return newList;
      });
    },
    [category, subCategory, sortType, updateURL]
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

    if (sortType === "lowhigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortType === "highlow") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, subCategory, sortType]);

  /* ------------------------------
      URL → STATE SYNC
  ------------------------------ */
  useEffect(() => {
    const cat = searchParams.get("category");
    const sub = searchParams.get("subCategory");
    const sort = searchParams.get("sort");

    setCategory(cat ? cat.split(",").map((x) => x.toLowerCase()) : []);
    setSubCategory(sub ? sub.split(",").map((x) => x.toLowerCase()) : []);
    if (sort) setSortType(sort);
  }, [searchParams]);

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
            className={`h-3 transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          <FilterCollection
            title={text.categories.toUpperCase()}
            filters={categoryFilters}
            selected={category}
            handleChange={(e) =>
              toggleFilter(e.target.value, setCategory, "category")
            }
          />

          <FilterCollection
            title={text.typeTitle.toUpperCase()}
            filters={typeFilters}
            selected={subCategory} 
            extraContainerCls={"!my-5"}
            handleChange={(e) =>
              toggleFilter(e.target.value, setSubCategory, "sub")
            }
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <div className="flex justify-between text-sm sm:text-2xl mb-4 items-center">
          <Title
            text1={text.all.toUpperCase()}
            text2={text.navbarmenu.collections.toUpperCase()}
          />

          <ProductSort
            sortType={sortType}
            sortOptions={sortOptions}
            handleSortTypeChange={(e) => {
              const newSort = e.target.value;
              setSortType(newSort);
              updateURL(category, subCategory, newSort);
            }}
          />
        </div>

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
