// pages/ProductDetail.jsx
import React from 'react';

// Componente que muestra los detalles de un producto en un modal
const ProductDetail = ({ product, onHide }) => {
  // --- Manejo de error en la carga de la imagen ---
  const handleImageError = (e) => {
    e.target.onerror = null; // Evita bucles de error
    e.target.src = 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Imagen';
  };  

  return (
    <div 
      id="productModal" 
      className="modal" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modalTitle"      
    >
      {/* --- Fondo del modal: clic para cerrar --- */}
      <div className="modal-backdrop" aria-hidden="true" onClick={onHide}></div>
      {/* --- Contenido principal del modal --- */}
      <div className="modal-content">
        {/* --- Encabezado del modal --- */}
        <header className="modal-header">
          <h2 id="modalTitle" className="modal-title">
            {product.name}
          </h2>
          <button 
            id="closeModal" 
            className="close-btn" 
            aria-label="Cerrar modal"
            onClick={onHide}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        {/* --- Cuerpo del modal con detalles del producto --- */}
        <div className="modal-body" id="modalBody">
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: '100%', 
              height: 'auto', 
              borderRadius: '12px', 
              marginBottom: '1rem'
            }}
            onError={handleImageError}
          />
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Precio:</strong> ${parseFloat(product.price).toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.stock} unidades</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Creado el:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
          <p><strong>Marca:</strong> {product.brand}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;