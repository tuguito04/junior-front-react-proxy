// pages/Create.jsx
import React from 'react';
import ProductForm from '../components/ProductForm';

const Create = ({ categories, onProductCreate, onCancel }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      id="createModal" 
      className="modal" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="createModalTitle"
      onClick={handleBackdropClick}
    >
      <div className="modal-backdrop" aria-hidden="true"></div>
      <div className="modal-content">
        <header className="modal-header">
          <h2 id="createModalTitle" className="modal-title">
            Crear Nuevo Producto
          </h2>
          <button 
            id="closeCreateModal" 
            className="close-btn" 
            aria-label="Cerrar modal"
            onClick={onCancel}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="modal-body">
          <ProductForm 
            onSubmit={onProductCreate}
            categories={categories}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;