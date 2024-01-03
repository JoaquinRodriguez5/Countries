import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

export const calculatePages = (filter) => {
  switch (filter) {
    case 'Africa':
      return 6;
    case 'Asia':
      return 5;
    case 'Europe':
      return 6;
    case 'Americas':
      return 6;
    case 'Oceania':
      return 3;
    default:
      return 25;
  }
};
const Paginator = ({ countries, limit, currentPage, onPageChange, filter, totalPages }) => {

  return (
    <div className="paginator">
      <ReactPaginate
        totalPages={totalPages}
        pageCount={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        forcePage={currentPage}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousLabel="Anterior"
        nextLabel="Siguiente"
      />
    </div>
  );
};

export default Paginator;