// App.jsx
import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, createProduct, PAGINATION_CONFIG } from './lib/api';
import Router from './routes';

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [categoriesData] = await Promise.all([
          fetchCategories(),
        ]);
        setCategories(categoriesData);
        
        // Cargar productos iniciales
        await loadProducts();
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Por favor, asegúrate de que el backend esté en ejecución e inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Función para cargar productos con filtros y paginación
  const loadProducts = async (query = searchTerm, category = selectedCategory, page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts(query, category, page, PAGINATION_CONFIG.PAGE_SIZE);
      setAllProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Error al cargar los productos. Por favor, asegúrate de que el backend esté en ejecución e inténtalo de nuevo.');
      setAllProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Recargar productos cuando cambien los filtros
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset página al cambiar filtros
      loadProducts(searchTerm, selectedCategory, 1);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  // Recargar productos cuando cambie la página
  useEffect(() => {
    if (currentPage > 1) {
      loadProducts(searchTerm, selectedCategory, currentPage);
    }
  }, [currentPage]);

  const handleCreateProduct = async (newProductData) => {
    try {
      await createProduct(newProductData);
      // Recargar la primera página después de crear
      setCurrentPage(1);
      await loadProducts(searchTerm, selectedCategory, 1);
    } catch (err) {
      console.error('Error creating product:', err);
      throw new Error('No se pudo crear el producto.');
    }
  };

  const handleRetry = () => {
    loadProducts(searchTerm, selectedCategory, currentPage);
  };

  return (
    <div className="app-container">
      <header className="app-header" role="banner">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🛍️</span>
            Products Store
          </h1>
          <p className="app-subtitle">Prueba Técnica - React</p>
        </div>
      </header>
      
      <Router
        view={view}
        setView={setView}
        products={allProducts}
        loading={loading}
        error={error}
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleCreateProduct={handleCreateProduct}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default App;