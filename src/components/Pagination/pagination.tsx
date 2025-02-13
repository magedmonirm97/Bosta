import React from 'react';
import { PaginationProps } from "../../interfaces/IPagination";

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    loading = false
  }) => {
    return (
      <div className="pagination">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="pagination-button"
        >
          Previous
        </button>
        
        <span className="page-info">
          {currentPage} / {totalPages}
        </span>
        
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    );
  };