import React from "react";
import { ShopContext } from "../context/ShopContext";
import text from "../languages/en.json";
import FilterCollection from "../components/collection/FilterCollection";
import { assets } from "../assets/assets";
import Title from "../common/Title";
import ProductSort from "../components/collection/ProductSort";
import PaginatedGallery from "../common/pagination";

const Collection = () => {
  const { products } = React.useContext(ShopContext);

  const [showFilter, setShowFilter] = React.useState(false);
   const [currentPage, setCurrentPage] = React.useState(1);

  //category filter array
  const categoryArray = React.useMemo(
    () => [
      text.categoriesinnotfoundpage.men,
      text.categoriesinnotfoundpage.women,
      text.categoriesinnotfoundpage.kids,
    ],
    []
  );

  //type filter array
  const typesArray = React.useMemo(
    () => [text.types.topwear, text.types.bottomwear, text.types.winterwear],
    []
  );

  //sort by array
  const sortOptions= React.useMemo(()=>[
    {
      label: `${text.sortoptions.sortby} ${text.sortoptions.relevancelabel}`,
      value: text.sortoptions.relevant
    },
    {
       label: `${text.sortoptions.sortby} ${text.sortoptions.lowhighlabel}`,
      value: text.sortoptions.lowhigh
    },
    {
       label: `${text.sortoptions.sortby} ${text.sortoptions.hightolabel}`,
      value: text.sortoptions.highlow
    }
  ],[])

  const getFilters = (arr) => {
    return arr.map((item) => ({
      label: item,
      value: item,
    }));
  };
  

  //function to show filters in mobile
  const handleShowFilter=()=>{
    setShowFilter(prev=> !prev)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p onClick={handleShowFilter} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          {text.filterstext.toUpperCase()}
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="filter dropdown" />
        </p>
        {/* Category filter */}
        <FilterCollection
          title={text.categories.toUpperCase()}
          filters={getFilters(categoryArray)}
          showFilter={showFilter}
        />
        <FilterCollection
          title={text.typeTitle.toUpperCase()}
          filters={getFilters(typesArray)}
          showFilter={showFilter}
          extraContainerCls={'!my-5'}
        />
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={text.all.toUpperCase()} text2={text.navbarmenu.collections.toUpperCase()} />
          <ProductSort 
            sortOptions={sortOptions}
          />
        </div>
      <div>
      <PaginatedGallery 
        data={products}
            itemsPerPage={8}
            page={currentPage}
            onPageChangeCallback={setCurrentPage}
      />
      </div>
      </div>
    </div>
  );
};

export default Collection;
