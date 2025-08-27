// components/ProductForm.jsx
import React, { useState } from 'react'; //useEffect

const ProductForm = ({ onSubmit, categories, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
    category: '',
    description: '',
    brand: ''
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Este campo es obligatorio.';
    }
    
    if (!formData.price) {
      newErrors.price = 'Este campo es obligatorio.';
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = 'El valor no puede ser negativo.';
    }
    
    if (!formData.stock) {
      newErrors.stock = 'Este campo es obligatorio.';
    } else if (parseFloat(formData.stock) < 0) {
      newErrors.stock = 'El valor no puede ser negativo.';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Este campo es obligatorio.';
    } else if (!formData.image.match(/^(http|https):\/\/[^ "]+$/)) {
      newErrors.image = 'Por favor, introduce una URL válida.';
    }
    
    if (!formData.category) {
      newErrors.category = 'Este campo es obligatorio.';
    }
    
    if (!formData.brand.trim()) {
      newErrors.brand = 'Este campo es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    if (validateForm()) {
      try {
        await onSubmit(formData);
        setSuccessMessage('Producto creado exitosamente.');
        setFormData({ 
          name: '', 
          price: '', 
          stock: '', 
          image: '', 
          category: '', 
          description: '',
          brand: ''
        });
        // Retrasar el cierre del modal para mostrar el mensaje
        setTimeout(() => {
          onCancel();
        }, 2000);
      } catch (err) {
        //setErrorMessage('Hubo un error al crear el producto. Inténtalo de nuevo.', err);
        setErrorMessage(err?.message || 'Hubo un error al crear el producto. Inténtalo de nuevo.');
      }
    } else {
      setErrorMessage('Por favor, corrige los errores del formulario.');
    }
  };

  // Cerrar modal automáticamente después de mostrar mensaje de éxito

  /*useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        onCancel();
      }, 2000);
      return () => clearTimeout(timer);
    }

  }, [successMessage, onCancel]);*/

  const renderError = (field) => (
    errors[field] && (
      <div className="field-error" role="alert">
        {errors[field]}
      </div>
    )
  );

  return (
    <>
      {successMessage && (
        <div className="message success" role="status">
          <span>&#10004;</span> {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="message error" role="alert">
          <span>&#10006;</span> {errorMessage}
        </div>
      )}
      
      <form id="createForm" className="product-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productName" className="form-label">
              Nombre del Producto <span className="required">*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              aria-describedby="name-error"
            />
            {renderError('name')}
          </div>
          
          <div className="form-group">
            <label htmlFor="productPrice" className="form-label">
              Precio <span className="required">*</span>
            </label>
            <input
              type="number"
              id="productPrice"
              name="price"
              className="form-input"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              aria-describedby="price-error"
            />
            {renderError('price')}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productStock" className="form-label">
              Stock <span className="required">*</span>
            </label>
            <input
              type="number"
              id="productStock"
              name="stock"
              className="form-input"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
              aria-describedby="stock-error"
            />
            {renderError('stock')}
          </div>
          
          <div className="form-group">
            <label htmlFor="productBrand" className="form-label">
              Marca <span className="required">*</span>
            </label>
            <input
              type="text"
              id="productBrand"
              name="brand"
              className="form-input"
              value={formData.brand}
              onChange={handleChange}
              required
              aria-describedby="brand-error"
            />
            {renderError('brand')}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="productImage" className="form-label">
            URL de la Imagen <span className="required">*</span>
          </label>
          <input
            type="url"
            id="productImage"
            name="image"
            className="form-input"
            value={formData.image}
            onChange={handleChange}
            required
            aria-describedby="image-error"
          />
          {renderError('image')}
        </div>
        
        <div className="form-group">
          <label htmlFor="productCategory" className="form-label">
            Categoría <span className="required">*</span>
          </label>
          <select
            id="productCategory"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
            aria-describedby="category-error"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {renderError('category')}
        </div>
        
        <div className="form-group">
          <label htmlFor="productDescription" className="form-label">Descripción</label>
          <textarea
            id="productDescription"
            name="description"
            className="form-textarea"
            rows="3"
            placeholder="Describe las características del producto..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-success submit-btn">
            <span className="btn-icon">✓</span>
            Crear Producto
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-outline cancel-btn"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;