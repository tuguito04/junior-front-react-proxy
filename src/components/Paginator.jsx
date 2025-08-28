// components/Paginator.jsx
import React from 'react';
// --- Componente de paginación ---
// Permite navegar entre páginas de productos
const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  // --- Estado de los botones ---
  // Deshabilita "Anterior" si estamos en la primera página
  const prevDisabled = currentPage === 1;
  // Deshabilita "Siguiente" si estamos en la última página
  const nextDisabled = currentPage >= totalPages;  

  // --- Renderizado del paginador ---
  return (
    <nav 
      id="pagination" 
      className="pagination" 
      role="navigation" 
      aria-label="Navegación de páginas"
    >
      {/* Botón Página Anterior */}
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
      {/* Información de la página actual */}
      <span 
        id="pageInfo" 
        className="page-info" 
        aria-live="polite"
      >
        Página {currentPage} de {totalPages}
      </span>
      {/* Botón Página Siguiente */}
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



