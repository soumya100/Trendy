/**
 * Generate page numbers with ellipsis logic
 */
const generatePageNumbers = (currentPage, totalPages, maxVisible = 5) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const pages = [];
  const halfVisible = Math.floor(maxVisible / 2);
  
  pages.push(1);
  
  let startPage = Math.max(2, currentPage - halfVisible);
  let endPage = Math.min(totalPages - 1, currentPage + halfVisible);
  
  if (currentPage <= halfVisible + 1) {
    endPage = maxVisible - 1;
  } else if (currentPage >= totalPages - halfVisible) {
    startPage = totalPages - maxVisible + 2;
  }
  
  if (startPage > 2) {
    pages.push('ellipsis-start');
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  if (endPage < totalPages - 1) {
    pages.push('ellipsis-end');
  }
  
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  return pages;
};

export default generatePageNumbers