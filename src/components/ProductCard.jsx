// components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onProductClick }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/400x220/E5E7EB/9CA3AF?text=No+Imagen';
  };

  return (
    <div
      className="product-card"
      onClick={() => onProductClick(product)}
      role="gridcell"
      data-id={product.id}
    >
      <img
        src={product.image}
        alt={product.name}
        onError={handleImageError}
      />
      <div className="card-content">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${parseFloat(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
