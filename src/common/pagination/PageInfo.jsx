/**
 * Page Info Component
 */
const PageInfo = ({ currentPage, totalPages, totalItems, itemsPerPage }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <div className="text-center text-xs sm:text-sm text-gray-600 py-3 sm:py-4 px-4">
      Showing <span className="font-medium text-gray-900">{startItem}-{endItem}</span> of{' '}
      <span className="font-medium text-gray-900">{totalItems}</span> products
    </div>
  );
};


export default PageInfo