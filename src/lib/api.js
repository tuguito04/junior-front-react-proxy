// lib/api.js

const API_CONFIG = {
  API_URL: 'http://localhost:5189/api',
};

const PAGINATION_CONFIG = {
  PAGE_SIZE: 10,
};

/* Simulated mock data for development
const mockProducts = [
  { id: 1, name: 'Laptop', price: 1200.00, stock: 50, category: 'Electrónicos', brand: 'TechPro', image: 'https://placehold.co/400x220/2563EB/ffffff?text=Laptop', createdAt: Date.now() },
  { id: 2, name: 'Mouse Inalámbrico', price: 25.50, stock: 200, category: 'Accesorios', brand: 'ErgoGear', image: 'https://placehold.co/400x220/EAB308/ffffff?text=Mouse', createdAt: Date.now() },
  { id: 3, name: 'Teclado Mecánico', price: 85.00, stock: 75, category: 'Accesorios', brand: 'ClickyKeys', image: 'https://placehold.co/400x220/10B981/ffffff?text=Teclado', createdAt: Date.now() },
  { id: 4, name: 'Monitor 4K', price: 450.00, stock: 30, category: 'Electrónicos', brand: 'VividView', image: 'https://placehold.co/400x220/F43F5E/ffffff?text=Monitor', createdAt: Date.now() },
  { id: 5, name: 'Auriculares Bluetooth', price: 65.00, stock: 150, category: 'Audio', brand: 'SoundWave', image: 'https://placehold.co/400x220/6366F1/ffffff?text=Auriculares', createdAt: Date.now() },
  { id: 6, name: 'Webcam HD', price: 45.00, stock: 100, category: 'Accesorios', brand: 'ClarityCam', image: 'https://placehold.co/400x220/EC4899/ffffff?text=Webcam', createdAt: Date.now() },
  { id: 7, name: 'Cámara Mirrorless', price: 980.00, stock: 20, category: 'Fotografía', brand: 'OptiShot', image: 'https://placehold.co/400x220/3B82F6/ffffff?text=Camara', createdAt: Date.now() },
  { id: 8, name: 'Impresora Multifunción', price: 210.00, stock: 40, category: 'Electrónicos', brand: 'PrintMax', image: 'https://placehold.co/400x220/06B6D4/ffffff?text=Impresora', createdAt: Date.now() },
  { id: 9, name: 'Silla Gamer', price: 299.99, stock: 60, category: 'Muebles', brand: 'ErgoPlay', image: 'https://placehold.co/400x220/93C5FD/ffffff?text=Silla', createdAt: Date.now() },
  { id: 10, name: 'Escritorio Ajustable', price: 350.00, stock: 80, category: 'Muebles', brand: 'WorkFit', image: 'https://placehold.co/400x220/FDE68A/ffffff?text=Escritorio', createdAt: Date.now() },
  { id: 11, name: 'Micrófono USB', price: 75.00, stock: 120, category: 'Audio', brand: 'VoiceClear', image: 'https://placehold.co/400x220/D1D5DB/ffffff?text=Microfono', createdAt: Date.now() },
  { id: 12, name: 'Tarjeta Gráfica', price: 600.00, stock: 25, category: 'Componentes', brand: 'RenderFast', image: 'https://placehold.co/400x220/1F2937/ffffff?text=Tarjeta', createdAt: Date.now() },
  { id: 13, name: 'Memoria RAM', price: 55.00, stock: 300, category: 'Componentes', brand: 'SpeedCore', image: 'https://placehold.co/400x220/6EE7B7/ffffff?text=RAM', createdAt: Date.now() },
  { id: 14, name: 'Disco Duro SSD', price: 90.00, stock: 180, category: 'Componentes', brand: 'FlashDrive', image: 'https://placehold.co/400x220/4B5563/ffffff?text=SSD', createdAt: Date.now() },
  { id: 15, name: 'Router WiFi 6', price: 110.00, stock: 90, category: 'Redes', brand: 'NetGen', image: 'https://placehold.co/400x220/FBBF24/ffffff?text=Router', createdAt: Date.now() },
  { id: 16, name: 'Switch de Red', price: 45.00, stock: 150, category: 'Redes', brand: 'DataLink', image: 'https://placehold.co/400x220/8B5CF6/ffffff?text=Switch', createdAt: Date.now() },
  { id: 17, name: 'Smartwatch', price: 180.00, stock: 65, category: 'Wearables', brand: 'TimeSync', image: 'https://placehold.co/400x220/9CA3AF/ffffff?text=Smartwatch', createdAt: Date.now() },
  { id: 18, name: 'Fitness Tracker', price: 70.00, stock: 110, category: 'Wearables', brand: 'FitSense', image: 'https://placehold.co/400x220/E5E7EB/9CA3AF?text=Tracker', createdAt: Date.now() },
  { id: 19, name: 'Proyector Portátil', price: 250.00, stock: 55, category: 'Electrónicos', brand: 'ScreenBeam', image: 'https://placehold.co/400x220/D1D5DB/ffffff?text=Proyector', createdAt: Date.now() },
  { id: 20, name: 'Batería Externa', price: 30.00, stock: 250, category: 'Accesorios', brand: 'PowerBank', image: 'https://placehold.co/400x220/FCA5A5/ffffff?text=PowerBank', createdAt: Date.now() },
  { id: 21, name: 'Altavoz Inteligente', price: 120.00, stock: 80, category: 'Audio', brand: 'EchoSound', image: 'https://placehold.co/400x220/A5B4FC/ffffff?text=Altavoz', createdAt: Date.now() },
  { id: 22, name: 'Tablet', price: 320.00, stock: 95, category: 'Electrónicos', brand: 'TabGen', image: 'https://placehold.co/400x220/B8B8B8/ffffff?text=Tablet', createdAt: Date.now() },
];

let nextId = mockProducts.length + 1;*/

// Función para simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Obtiene productos con paginación, búsqueda y filtros desde el backend
export const fetchProducts = async (query = '', category = '', page = 1, pageSize = PAGINATION_CONFIG.PAGE_SIZE) => {
  await delay(500); // Simula latencia de red
  const url = new URL(`${API_CONFIG.API_URL}/products`);
  
  // Filtra productos por query y categoría
  //let filteredProducts = mockProducts;
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  
  if (query) {
    /*filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())*/
      url.searchParams.append('query', query);    
  }
  
  if (category) {
    //filteredProducts = filteredProducts.filter(p => p.category === category);
    url.searchParams.append('category', category);
  }
  
  /*const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filteredProducts.slice(startIndex, endIndex);
  
  return {
    items,
    total: filteredProducts.length,
    page,
    pageSize,
    totalPages: Math.ceil(filteredProducts.length / pageSize)
  };*/

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error al cargar los productos de la API.');    
  }
  return await response.json();
};

// Obtiene todas las categorías únicas
export const fetchCategories = async () => {
  await delay(300);
  /*const categories = [...new Set(mockProducts.map(p => p.category))];
  return categories;*/
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
  /*const productWithId = { 
    ...newProduct, 
    id: nextId++, 
    createdAt: Date.now() 
  };
  mockProducts.push(productWithId);
  return productWithId;*/

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