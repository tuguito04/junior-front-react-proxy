// components/Paginator.jsx
import React from 'react';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage >= totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav 
      id="pagination" 
      className="pagination" 
      role="navigation" 
      aria-label="Navegación de páginas"
    >
      <button
        id="prevBtn"
        className="btn btn-outline pagination-btn"
        disabled={prevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        <span className="btn-icon">←</span>
        Anterior
      </button>
      <span 
        id="pageInfo" 
        className="page-info" 
        aria-live="polite"
      >
        Página {currentPage} de {totalPages}
      </span>
      <button
        id="nextBtn"
        className="btn btn-outline pagination-btn"
        disabled={nextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Página siguiente"
      >
        Siguiente
        <span className="btn-icon">→</span>
      </button>
    </nav>
  );
};

export default Paginator;
