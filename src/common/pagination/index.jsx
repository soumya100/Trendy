/**
 * MAIN COMPONENT: Paginated Gallery
 * 
 * @param {Object} props
 * @param {'client' | 'server'} props.mode - Pagination mode
 * @param {Array} props.data - Full dataset (required for client mode)
 * @param {Array} props.items - Current page items (required for server mode)
 * @param {number} props.totalItems - Total items count (required for server mode)
 * @param {Function} props.onPageChange - Callback for page changes (required for server mode)
 * @param {number} props.itemsPerPage - Items per page (default: 12)
 * @param {number} props.page - Controlled page number (optional)
 * @param {Function} props.onPageChangeCallback - Additional callback when page changes
 * @param {Function} props.renderItem - Function to render each item
 * @param {boolean} props.loading - Loading state (for server mode)
 */

import React, { useState } from "react";
import PageInfo from "./PageInfo";
import Pagination from "./Pagination";
import ProductItem from "../../components/home/ProductItem";


const PaginatedGallery = ({
  mode = 'client',
  data = [],
  items = [],
  totalItems,
  onPageChange,
  itemsPerPage = 12,
  page,
  onPageChangeCallback,
  renderItem,
  loading = false
}) => {
  const [internalPage, setInternalPage] = useState(1);
  
  const currentPage = page !== undefined ? page : internalPage;
  const actualTotalItems = mode === 'client' ? data.length : totalItems;
  const totalPages = Math.ceil(actualTotalItems / itemsPerPage);
  
  const getCurrentItems = () => {
    if (mode === 'client') {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    }
    return items;
  };
  
  const currentItems = getCurrentItems();
  
  const handlePageChange = async (newPage) => {
    const pageNumber = Math.max(1, Math.min(newPage, totalPages));
    
    if (pageNumber === currentPage) return;
    
    // Update internal state if not controlled
    if (page === undefined) {
      setInternalPage(pageNumber);
    }
    
    // Only call callback if provided (for controlled mode)
    if (onPageChangeCallback) {
      onPageChangeCallback(pageNumber);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Call server callback only for server mode
    if (mode === 'server' && onPageChange) {
      onPageChange({
        page: pageNumber,
        limit: itemsPerPage,
        offset: (pageNumber - 1) * itemsPerPage
      });
    }
  };
  
  return (
    <div>
      <div className="relative">
        {mode === 'server' && loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 min-h-[400px]">
            <svg 
              className="animate-spin text-gray-900" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 px-4 sm:px-0">
          {currentItems.map((item, index) => (
            <React.Fragment key={item._id || index}>
              {renderItem ? renderItem(item) : (
                <div className="group cursor-pointer">
                  <div className="bg-white aspect-square mb-2 sm:mb-3 flex items-center justify-center transition-colors">
                    <ProductItem id={item._id} image={item.image} name={item.name} price={item.price}/>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <PageInfo
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={actualTotalItems}
        itemsPerPage={itemsPerPage}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={mode === 'server' && loading}
      />
    </div>
  );
};

export default PaginatedGallery