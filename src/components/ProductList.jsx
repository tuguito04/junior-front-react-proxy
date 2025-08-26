// components/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="products-grid" role="grid" aria-label="Lista de productos">
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--gray-500)', 
          gridColumn: '1 / -1',
          padding: 'var(--space-8) 0'
        }}>
          No se encontraron productos que coincidan con la búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid" role="grid" aria-label="Lista de productos">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onProductClick={onProductClick} 
        />
      ))}
    </div>
  );
};

export default ProductList;
