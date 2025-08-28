// components/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

// Componente de lista de productos
// Renderiza todos los productos en una cuadrícula usando ProductCard
const ProductList = ({ products, onProductClick }) => {
  // --- Caso sin productos ---
  // Si no hay productos, muestra un mensaje centrado
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

  // --- Renderizado de productos ---
  // Itera sobre la lista de productos y crea un ProductCard por cada uno
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
