# junior-front-react-proxy

Este proyecto es un **frontend en React** que consume una API mínima para gestionar productos.  
Es una migración del proyecto en **JavaScript vanilla** hacia un enfoque con **componentes, hooks y Vite**.  
Incluye búsqueda, filtrado por categorías, paginación, creación de productos y manejo de UI.

---

## 📂 Estructura del proyecto

- junior-front-react-proxy/
- ├─ src/
- │  ├─ App.jsx              # Componente raíz, maneja estado global y lógica principal
- │  ├─ routes.jsx           # Definición de rutas (Home, Detalle, Crear)
- │  ├─ components/          # Componentes reutilizables
- │  │  ├─ SearchBar.jsx     # Barra de búsqueda con debounce
- │  │  ├─ CategorySelect.jsx# Filtro de categorías
- │  │  ├─ ProductList.jsx   # Renderiza la lista de productos
- │  │  ├─ ProductCard.jsx   # Tarjeta individual de producto
- │  │  ├─ Paginator.jsx     # Navegación entre páginas
- │  │  └─ ProductForm.jsx   # Formulario para crear/editar productos
- │  ├─ pages/               # Vistas principales
- │  │  ├─ Home.jsx          # Página inicial, listado y filtros
- │  │  ├─ ProductDetail.jsx # Página de detalle de producto
- │  │  └─ Create.jsx        # Página de creación de producto
- │  └─ lib/
- │     └─ api.js            # Conexión con la API (GET, POST, etc.)
- ├─ .env.example            # Variables de entorno (API_URL, PAGE_SIZE, etc.)
- ├─ vite.config.js          # Configuración de Vite
- └─ README.md               # Documentación del proyecto

---

## ⚙️ Funcionalidades principales

- **Listado de productos**: renderiza productos desde la API.
- **Buscar y filtrar**: combina búsqueda en texto y selección de categoría.
- **Paginación**: permite navegar entre páginas con control de estado.
- **Detalle de producto**: muestra información específica al seleccionarlo.
- **Crear producto**: formulario validado que envía datos al backend.
- **Diseño responsivo** con CSS simple.

---

## 🧩 Módulos principales

### 1. `App.jsx`
- Componente raíz.
- Define estados globales (`products`, `categories`, `loading`, `error`, `searchTerm`, `selectedCategory`, `currentPage`, etc.).
- Coordina la lógica de búsqueda, filtrado, paginación y renderizado de vistas.

### 2. `routes.jsx`
- Configura la navegación entre:
  - `Home`
  - `ProductDetail`
  - `Create`

### 3. `components/`
- **SearchBar.jsx**: input controlado con debounce para búsquedas.
- **CategorySelect.jsx**: `<select>` para filtrar por categorías.
- **ProductList.jsx**: recibe productos y los renderiza en una cuadrícula.
- **ProductCard.jsx**: muestra datos individuales de un producto.
- **Paginator.jsx**: controla botones de siguiente/anterior y total de páginas.
- **ProductForm.jsx**: formulario validado para crear productos.

### 4. `pages/`
- **Home.jsx**: integra filtros, lista y paginación.
- **ProductDetail.jsx**: muestra un producto seleccionado.
- **Create.jsx**: página de creación de producto.

### 5. `lib/api.js`
- Abstrae la comunicación con la API:
  - `getProducts({ page, pageSize, query, category })`
  - `getCategories()`
  - `createProduct(data)`

---

## 🚀 Flujo de la aplicación

1. El usuario entra a la app (`Home.jsx`).
2. `App.jsx` inicializa estado y pide productos a `api.js`.
3. Los componentes (`SearchBar`, `CategorySelect`, `Paginator`) actualizan estados globales.
4. `ProductList` renderiza los resultados.
5. El usuario puede:
   - Buscar o filtrar → se reinicia a página 1 y se actualiza la vista.
   - Cambiar de página → `Paginator` actualiza estado y recarga productos.
   - Ver detalle → se abre `ProductDetail`.
   - Crear producto → desde `Create.jsx` se envía un `POST` y se refresca la lista.

---

## 💡 Cómo correr el proyecto

1. Clonar el repositorio:
   ```bash
   git clone <repository-url>
   cd junior-front-react-proxy
   npm install
   npm run dev



