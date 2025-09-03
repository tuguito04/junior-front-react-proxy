// components/ProductForm.jsx
import React, { useState, useEffect, useRef } from 'react'; 

// --- Formulario de creación de producto ---
// Permite crear un producto con validación, mensajes de éxito/error y scroll automático
const ProductForm = ({ onSubmit, categories, onCancel }) => {
  // --- Estados del formulario ---
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
  // Referencia al contenedor de mensajes
  const messageRef = useRef(null);

  // --- Prevención de "e", "+", "-" en inputs number ---
  useEffect(() => {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    const preventInvalid = (e) => {
      if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
    };
    numberInputs.forEach(input => input.addEventListener('keydown', preventInvalid));

    return () => numberInputs.forEach(input => input.removeEventListener('keydown', preventInvalid));
  }, []);

  // --- Maneja cambios en los inputs ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Validación de formulario usando reglas dinámicas ---
  const validateForm = () => {
    const newErrors = {};
    const fields = [
      { name: 'name', type: 'text', minLength: 3 },
      { name: 'price', type: 'number' },
      { name: 'stock', type: 'number' },
      { name: 'image', type: 'url' },
      { name: 'category', type: 'text' },
      { name: 'brand', type: 'text', minLength: 2 }
    ];

    const validationRules = {
      text: [
        { check: input => !input.value.trim(), msg: 'Este campo es obligatorio.' },
        { check: input => input.minLength && input.value.length < input.minLength, msg: input => `Debe tener al menos ${input.minLength} caracteres.` }
      ],
      number: [
        { check: input => !input.value, msg: 'Este campo es obligatorio.' },
        { check: input => parseFloat(input.value) < 0, msg: 'El valor no puede ser negativo.' }
      ],
      url: [
        { check: input => !input.value.trim(), msg: 'Este campo es obligatorio.' },
        { check: input => !/^https?:\/\/[\w.-]+(\.[\w.-]+)+[/#?]?.*$/.test(input.value), msg: 'Por favor, introduce una URL válida que comience con http:// o https://' }
      ]
    };

    fields.forEach(field => {
      const value = formData[field.name];
      const rules = validationRules[field.type];
      for (let rule of rules) {
        if (rule.check({ value, minLength: field.minLength })) {
          newErrors[field.name] = typeof rule.msg === 'function' ? rule.msg({ value, minLength: field.minLength }) : rule.msg;
          break; // mostrar solo el primer error
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    
  // --- Maneja el submit del formulario ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    if (validateForm()) {
      try {
        await onSubmit(formData); // Ejecuta callback para crear producto
        setSuccessMessage('Producto creado exitosamente.');
        // Reset del formulario
        setFormData({ 
          name: '', 
          price: '', 
          stock: '', 
          image: '', 
          category: '', 
          description: '',
          brand: ''
        });        
      } catch (err) {        
        setErrorMessage(err?.message || 'Hubo un error al crear el producto. Inténtalo de nuevo.');
      }
    } else {
      setErrorMessage('Por favor, corrige los errores del formulario.');
    }
  };

  //Scroll automático hacia los mensajes
  useEffect(() => {
    if ((successMessage || errorMessage) && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [successMessage, errorMessage]);

  // Cerrar modal automáticamente después de mostrar mensaje de éxito

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        onCancel();
      }, 2000);
      return () => clearTimeout(timer);
    }

  }, [successMessage, onCancel]);

  // --- Renderiza errores de cada campo ---
  const renderError = (field) => (
    errors[field] && (
      <div className="field-error" role="alert">
        {errors[field]}
      </div>
    )
  );

  // --- Renderizado del formulario ---
  return (
    <>
    {/* Mensajes de éxito/error */}
    <div ref={messageRef}>
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
    </div> 
      {/* Formulario de producto */}
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
              required minlength="3" maxlength="40"
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
              required minlength="3" maxlength="40"
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