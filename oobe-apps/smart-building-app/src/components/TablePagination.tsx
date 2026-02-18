import React from "react";
import Pagination from "react-bootstrap/Pagination";

const MAX_SHOWN_PAGES = 5;

interface Props {
  activePage: number;
  canLoadMorePages?: boolean;
  onLoadMore?: () => void;
  onPageChange: (pageIndex: number) => void;
  totalPages: number;
}

const TablePagination = ({
  activePage,
  canLoadMorePages = false,
  onLoadMore,
  onPageChange,
  totalPages,
}: Props): React.ReactElement | null => {
  if (totalPages < 2) {
    return null;
  }

  let endPage = activePage + Math.floor(MAX_SHOWN_PAGES / 2);
  if (endPage < MAX_SHOWN_PAGES - 1) {
    endPage = MAX_SHOWN_PAGES - 1;
  }
  if (endPage > totalPages - 1) {
    endPage = totalPages - 1;
  }

  let startPage = endPage - (MAX_SHOWN_PAGES - 1);
  if (startPage < 0) {
    startPage = 0;
  }

  const items = [];
  for (let pageIndex = startPage; pageIndex <= endPage; pageIndex += 1) {
    items.push(
      <Pagination.Item
        key={pageIndex}
        active={pageIndex === activePage}
        onClick={() => {
          onPageChange(pageIndex);
        }}
        className="d-flex align-items-center justify-content-center"
        linkStyle={{
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {pageIndex + 1}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination
      className="justify-content-end"
      style={{
        display: "flex",
        gap: "8px",
      }}
    >
      {startPage > 0 && (
        <Pagination.First
          onClick={() => {
            onPageChange(0);
          }}
          linkStyle={{
            border: "none",
            background: "transparent",
            boxShadow: "none",
          }}
        />
      )}
      {items}
      {(endPage < totalPages - 1 || canLoadMorePages) && (
        <Pagination.Last
          onClick={() => {
            if (endPage === totalPages - 1) {
              return onLoadMore && onLoadMore();
            }
            return onPageChange(totalPages - 1);
          }}
          linkStyle={{
            border: "none",
            background: "transparent",
            boxShadow: "none",
          }}
        />
      )}
    </Pagination>
  );
};

export default TablePagination;
