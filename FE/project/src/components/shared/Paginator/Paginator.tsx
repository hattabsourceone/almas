import React from "react";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
};

const Paginator: React.FC<Props> = ({ page, setPage, totalPage }) => {
  const Next = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const Previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (p: number) => {
    setPage(p);
  };

  const renderPageNumbers = () => {
    const totalVisiblePages = 9; // Minimum numbers to render
    let startPage, endPage;
  
    if (totalPage <= totalVisiblePages) {
      // If total pages are less than or equal to 9, show all pages
      startPage = 1;
      endPage = totalPage;
    } else {
      // Calculate start and end pages ensuring the current page stays centered when possible
      const offset = Math.floor(totalVisiblePages / 2);
      startPage = Math.max(page - offset, 1);
      endPage = Math.min(page + offset, totalPage);
  
      // Adjust range if near the beginning or end
      if (startPage === 1) {
        endPage = totalVisiblePages;
      } else if (endPage === totalPage) {
        startPage = totalPage - totalVisiblePages + 1;
      }
    }
  
    // Generate the page numbers
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item`}>
          <button
            className={`text-[12px] font-medium w-[32px] h-[30px] rounded-sm border ${
              page === i ? "bg-[#1f1f41] text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }
  
    return pages;
  };
  

  return (
    <div className="flex sm:flex-row flex-col-reverse sm:justify-between px-1 justify-center items-center mb-2">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "hidden" : ""}`}>
            <button
              className="text-[12px] font-medium w-[32px] h-[30px] rounded-sm border hover:bg-gray-200 "
              onClick={() => goToPage(1)}
            >
              {"|<"}
            </button>
          </li>
          <li className={`page-item ${page === 1 ? "hidden" : ""}`}>
            <button
              className="text-[12px] font-medium w-[32px] h-[30px] rounded-sm border hover:bg-gray-200"
              onClick={Previous}
            >
              &lt;
            </button>
          </li>
          {renderPageNumbers()}
          <li className={`page-item ${page === totalPage ? "hidden" : ""}`}>
            <button
              className="text-[12px] font-medium w-[32px] h-[30px] rounded-sm border hover:bg-gray-200"
              onClick={Next}
            >
              &gt;
            </button>
          </li>
          <li className={`page-item ${page === totalPage ? "hidden" : ""}`}>
            <button
              className="text-[12px] font-medium w-[32px] h-[30px] rounded-sm border hover:bg-gray-200"
              onClick={() => goToPage(totalPage)}
            >
              {">|"}
            </button>
          </li>
        </ul>
      </nav>
      <span
        className="text-[12px] text-[#666]"
        style={{ fontFamily: '"Open Sans", sans-serif' }}
      >
        Showing {page} to {Math.min(page * 24, totalPage * 24)} of{" "}
        {totalPage * 24} ({totalPage} Pages)
      </span>
    </div>
  );
};

export default Paginator;
