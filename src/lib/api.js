// lib/api.js

const API_CONFIG = {
  API_URL: 'http://localhost:5189/api',
};

const PAGINATION_CONFIG = {
  PAGE_SIZE: 10,
};

// Función para simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Obtiene productos con paginación, búsqueda y filtros desde el backend
export const fetchProducts = async (query = '', category = '', page = 1, pageSize = PAGINATION_CONFIG.PAGE_SIZE) => {
  await delay(500); // Simula latencia de red
  const url = new URL(`${API_CONFIG.API_URL}/products`);
  
  // Filtra productos por query y categoría  
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  
  if (query) {    
      url.searchParams.append('query', query);    
  }
  
  if (category) {    
    url.searchParams.append('category', category);
  }
  
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error al cargar los productos de la API.');    
  }
  return await response.json();
};

// Obtiene todas las categorías únicas
export const fetchCategories = async () => {
  await delay(300);  
  const url = `${API_CONFIG.API_URL}/categories`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error al cargar las categorias de la API.');    
  }
  return await response.json();
};

// Crea un nuevo producto
export const createProduct = async (newProduct) => {
  await delay(500);
  const url = `${API_CONFIG.API_URL}/products`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error('Error al crear un nuevo producto.');    
  }
  return await response.json();
};

export { API_CONFIG, PAGINATION_CONFIG };