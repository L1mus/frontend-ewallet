import React from "react";
import cn from "../../utils/cn";

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages === 0) return null;

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
      <span className="font-medium">
        Show {Math.min(itemsPerPage, totalItems)} History of {totalItems}{" "}
        History
      </span>

      <div className="flex items-center gap-4 md:gap-6">
        <button
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className="text-grey text-base font-medium transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex items-center gap-4 md:gap-5">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "text-base transition-colors",
                currentPage === page
                  ? "text-primary font-bold"
                  : "font-medium text-gray-400 hover:text-black",
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className="hover:text-primary text-base font-bold text-black transition-colors disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
