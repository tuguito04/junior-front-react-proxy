// pages/Home.jsx
import React from 'react';
import SearchBar from '../components/SearchBar';
import CategorySelect from '../components/CategorySelect';
import ProductList from '../components/ProductList';
import Paginator from '../components/Paginator';

// Componente principal de la página Home
// Muestra barra de búsqueda, filtros, lista de productos y paginación
const Home = ({ 
  products, 
  loading, 
  error, 
  categories, 
  setView, 
  onProductClick, 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  currentPage, 
  totalPages, 
  onPageChange,
  onRetry 
}) => {
  return (
    <main className="app-main" role="main">
      {/* --- Sección de búsqueda y filtros --- */}
      <section className="search-section" aria-label="Búsqueda y filtros">
        {/* Barra de búsqueda */}
        <div className="search-container">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={onSearchChange} 
          />
        </div>
        
        {/* Filtros y botón de creación de producto */}
        <div className="filters-container">
          <CategorySelect 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onCategoryChange={onCategoryChange} 
          />
          <button
            onClick={() => setView('create')}
            className="btn btn-success create-btn"
          >
            <span className="btn-icon">➕</span>
            Crear Producto
          </button>
        </div>
      </section>

      {/* Sección de contenido: lista de productos, estados de carga y error */}
      <section className="content-section">
        {/* Estado de carga */}
        {loading && (
          <div 
            id="loadingState" 
            className="loading-state" 
            role="status" 
            aria-live="polite"
          >
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando productos...</p>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <div 
            id="errorState" 
            className="error-state" 
            role="alert" 
            aria-live="assertive"
          >
            <div className="error-icon">⚠️</div>
            <p id="errorMessage" className="error-message">{error}</p>
            <button 
              id="retryBtn" 
              className="btn btn-secondary retry-btn"
              onClick={onRetry}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Lista de productos y paginación cuando no hay carga ni error */}
        {!loading && !error && (
          <>
            <div className="products-container">
              <ProductList 
                products={products} 
                onProductClick={onProductClick} 
              />
            </div>
            <Paginator 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={onPageChange} 
            />
          </>
        )}
      </section>
    </main>
  );
};

export default Home;


