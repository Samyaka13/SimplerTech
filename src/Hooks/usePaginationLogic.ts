import { useEffect, useState } from "react";

function usePaginationLogic<T>(
  filteredData: T[],
  itemsPerPage: number,
  dependencies?: any[],
  isMobile?: boolean
) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, dependencies);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 2) {
      for (let i = 1; i <= (isMobile ? 2 : 4); i++) pages.push(i);
      pages.push("...", totalPages);
    } else if (currentPage >= totalPages - 1) {
      pages.push(1, "...");
      for (let i = totalPages - (isMobile ? 1 : 3); i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (!isMobile) pages.push("...");
      pages.push(currentPage);
      if (!isMobile) pages.push(currentPage + 1, "...");
      pages.push(totalPages);
    }

    return pages;
  };

  return {
    currentPage,
    totalPages,
    currentData,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    getPageNumbers,
    startIndex,
    endIndex
  };
}

export default usePaginationLogic;
