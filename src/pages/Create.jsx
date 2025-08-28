// pages/Create.jsx
import React from 'react';
import ProductForm from '../components/ProductForm';

// Componente de creación de un nuevo producto
// Muestra un modal con el formulario de creación
const Create = ({ categories, onProductCreate, onCancel }) => {  

  return (
    <div 
      id="createModal" 
      className="modal" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="createModalTitle"
      
    >
      {/* --- Fondo del modal (backdrop) --- */}
      <div className="modal-backdrop" aria-hidden="true" onClick={onCancel}></div>
      {/* --- Contenido principal del modal --- */}
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
        {/* --- Cuerpo del modal con el formulario de producto --- */}
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