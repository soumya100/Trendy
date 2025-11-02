import generatePageNumbers from "./generatePageNumbers";

/**
 * Pagination Component
 */
const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 py-6 sm:py-8 px-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`
          flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 border border-gray-300
          transition-all duration-200 shrink-0
          ${currentPage === 1 || loading
            ? 'text-gray-300 cursor-not-allowed bg-gray-50' 
            : 'text-gray-700 hover:border-gray-900 hover:bg-gray-50 active:bg-gray-100'
          }
        `}
        aria-label="Previous page"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full">
        {pageNumbers.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span 
                key={`${page}-${index}`}
                className="w-8 h-10 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 shrink-0"
              >
                ...
              </span>
            );
          }
          
          const isActive = page === currentPage;
          
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={loading}
              className={`
                w-10 h-10 sm:w-10 sm:h-10 border transition-all duration-200 shrink-0 text-sm sm:text-base
                ${isActive 
                  ? 'bg-gray-900 text-white border-gray-900' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50 active:bg-gray-100'
                }
                ${loading ? 'cursor-not-allowed opacity-50' : ''}
              `}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>
      
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`
          flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 border border-gray-300
          transition-all duration-200 shrink-0
          ${currentPage === totalPages || loading
            ? 'text-gray-300 cursor-not-allowed bg-gray-50' 
            : 'text-gray-700 hover:border-gray-900 hover:bg-gray-50 active:bg-gray-100'
          }
        `}
        aria-label="Next page"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      {/* Loading Indicator */}
      {loading && (
        <div className="ml-0 sm:ml-3 mt-2 sm:mt-0 flex items-center text-gray-600">
          <svg 
            className="animate-spin" 
            width="18" 
            height="18" 
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
    </div>
  );
};

export default Pagination