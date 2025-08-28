// routes.jsx
import React from 'react';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Create from './pages/Create';

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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  const handleCloseModals = () => {
    setSelectedProduct(null);
    setView('home');
  };

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
