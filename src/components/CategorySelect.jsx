// components/CategorySelect.jsx
import React from 'react';
// --- Componente de selección de categoría ---
// Permite filtrar productos según la categoría seleccionada
const CategorySelect = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-group">
      {/* --- Etiqueta del selector --- */}
      <label htmlFor="categorySelect" className="filter-label">Categoría</label>
      {/* --- Selector de categoría --- */}
      <select
        id="categorySelect"
        className="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {/* Opción por defecto que muestra todas las categorías */}
        <option value="">Todas las categorías</option>
        {/* Genera opciones dinámicamente según el arreglo de categorías */}
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
