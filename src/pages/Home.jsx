// pages/Home.jsx
import React from 'react';
import SearchBar from '../components/SearchBar';
import CategorySelect from '../components/CategorySelect';
import ProductList from '../components/ProductList';
import Paginator from '../components/Paginator';

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
      <section className="search-section" aria-label="Búsqueda y filtros">
        <div className="search-container">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={onSearchChange} 
          />
        </div>
        
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

      <section className="content-section">
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

/*import React from 'react';
import SearchBar from '../components/SearchBar';
import CategorySelect from '../components/CategorySelect';
import ProductList from '../components/ProductList';
import Paginator from '../components/Paginator';

const Home = ({ products, loading, error, categories, setView, onProductClick, searchTerm, onSearchChange, selectedCategory, onCategoryChange, currentPage, totalPages, onPageChange, onRetry }) => {
  return (
    <main className="app-main">
      <section className="search-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <CategorySelect categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
        <button className="btn btn-success" onClick={() => setView('create')}>➕ Crear Producto</button>
      </section>

      <section className="content-section">
        {loading && <p>Cargando productos...</p>}
        {error && <div><p>{error}</p><button onClick={onRetry}>Reintentar</button></div>}
        {!loading && !error && (
          <>
            <ProductList products={products} onProductClick={onProductClick} />
            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </>
        )}
      </section>
    </main>
  );
};

export default Home;*/
