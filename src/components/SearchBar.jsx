// components/SearchBar.jsx
import React from 'react';

// Componente de barra de búsqueda
// Permite al usuario filtrar productos por término de búsqueda
const SearchBar = ({ searchTerm, onSearchChange }) => {

  // --- Maneja la tecla Enter en el input ---
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {      
      e.preventDefault(); // Evita comportamiento por defecto del Enter
      onSearchChange(searchTerm); // Ejecuta la búsqueda con el término actual
    }
  };

  // Maneja el click en el botón de buscar
  const handleSearchClick = () => {
    onSearchChange(searchTerm); // Ejecuta la búsqueda
  };

  return (
    <div className="search-input-group">
      {/* --- Label accesible para lectores de pantalla --- */}
      <label htmlFor="searchInput" className="sr-only">Buscar productos</label>
      {/* --- Input de búsqueda --- */}
      <input 
        type="text" 
        id="searchInput"
        placeholder="Buscar productos..." 
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-describedby="search-help"
      />
      {/* --- Botón de búsqueda --- */}
      <button className="btn btn-primary search-btn" aria-label="Buscar" onClick={handleSearchClick}>
        <span className="btn-icon">🔍</span>
        Buscar
      </button>
      {/* --- Texto de ayuda accesible solo para lectores de pantalla --- */}
      <div id="search-help" className="sr-only">
        Presiona Enter o haz clic en buscar para filtrar productos
      </div>
    </div>
  );
};

export default SearchBar;

