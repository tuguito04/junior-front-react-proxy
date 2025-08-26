// components/CategorySelect.jsx
import React from 'react';

const CategorySelect = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-group">
      <label htmlFor="categorySelect" className="filter-label">Categoría</label>
      <select
        id="categorySelect"
        className="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Todas las categorías</option>
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
