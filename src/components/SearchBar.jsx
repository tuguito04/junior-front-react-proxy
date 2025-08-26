// components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // El onSearchChange ya maneja la búsqueda
      e.preventDefault();
    }
  };

  return (
    <div className="search-input-group">
      <label htmlFor="searchInput" className="sr-only">Buscar productos</label>
      <input 
        type="text" 
        id="searchInput"
        placeholder="Buscar productos..." 
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-describedby="search-help"
      />
      <button className="btn btn-primary search-btn" aria-label="Buscar">
        <span className="btn-icon">🔍</span>
        Buscar
      </button>
      <div id="search-help" className="sr-only">
        Presiona Enter o haz clic en buscar para filtrar productos
      </div>
    </div>
  );
};

export default SearchBar;

