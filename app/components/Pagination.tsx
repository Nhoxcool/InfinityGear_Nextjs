import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 px-4 mr-2 bg-gray-200 text-gray-700 rounded"
      >
        Previous
      </button>
      <span className="py-2 px-4 bg-gray-200 text-gray-700 rounded">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 ml-2 bg-gray-200 text-gray-700 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
