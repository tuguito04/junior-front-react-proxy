// components/ProductCard.jsx
import React from 'react';
// --- Componente de tarjeta de producto ---
// Muestra la información básica de un producto (imagen, nombre, categoría, precio)
// y permite manejar el clic para ver detalles.
const ProductCard = ({ product, onProductClick }) => {
  // --- Manejo de error en la imagen ---
  // Si la URL de la imagen falla, se reemplaza con un placeholder
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/400x220/E5E7EB/9CA3AF?text=No+Imagen';
  };

  // --- Renderizado de la tarjeta ---
  return (
    <div
      className="product-card"
      onClick={() => onProductClick(product)}
      role="gridcell"
      data-id={product.id}
    >
      {/* Imagen del producto */}
      <img
        src={product.image}
        alt={product.name}
        onError={handleImageError}
      />
      {/* Contenido textual de la tarjeta */}
      <div className="card-content">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${parseFloat(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
