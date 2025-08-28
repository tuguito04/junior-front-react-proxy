// routes.jsx
import React from 'react';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Create from './pages/Create';

// Router principal que maneja la vista actual
const Router = ({ 
  view, 
  setView, 
  products, 
  loading, 
  error, 
  categories, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  currentPage, 
  setCurrentPage, 
  totalPages,
  selectedProduct, 
  setSelectedProduct, 
  handleCreateProduct,
  onRetry
}) => {
  // --- Manejo de cambio de página ---
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- Manejo de clic en un producto ---
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  // --- Cerrar modales y regresar a la vista Home ---
  const handleCloseModals = () => {
    setSelectedProduct(null);
    setView('home');
  };

  // --- Renderizado condicional según la vista actual ---
  switch (view) {
    case 'home':
      return (
        <Home
          products={products}
          loading={loading}
          error={error}
          categories={categories}
          setView={setView}
          onProductClick={handleProductClick}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRetry={onRetry}
        />
      );
    case 'detail':
      return selectedProduct ? (
        <div>
          {/* Se muestra Home detrás del detalle */}
          <Home
            products={products}
            loading={loading}
            error={error}
            categories={categories}
            setView={setView}
            onProductClick={handleProductClick}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRetry={onRetry}
          />
          <ProductDetail
            product={selectedProduct}
            onHide={handleCloseModals}
          />
        </div>
      ) : null;
    case 'create':
      return (
        <div>
          {/* Se muestra Home detrás del formulario de creación */}
          <Home
            products={products}
            loading={loading}
            error={error}
            categories={categories}
            setView={setView}
            onProductClick={handleProductClick}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRetry={onRetry}
          />
          <Create
            categories={categories}            
            onProductCreate={handleCreateProduct}
            onCancel={handleCloseModals}
          />
        </div>
      );
    default:
      // --- Vista por defecto para rutas no encontradas ---
      return (
        <Home 
          products={[]} 
          loading={false} 
          error="Página no encontrada." 
          categories={[]}
          setView={setView}
          onProductClick={handleProductClick}
          searchTerm=""
          onSearchChange={() => {}}
          selectedCategory=""
          onCategoryChange={() => {}}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          onRetry={() => {}}
        />
      );
  }
};

export default Router;
