// Importamos React, la librería principal para construir interfaces de usuario
import React from 'react';
// Importamos ReactDOM para renderizar nuestra app en el DOM del navegador
import ReactDOM from 'react-dom/client';
// Importamos BrowserRouter para habilitar el enrutamiento en nuestra aplicación
import {BrowserRouter} from 'react-router-dom';
// Importamos el componente principal de la aplicación
import App from './App.jsx';
// Importamos los estilos CSS globales de la aplicación
import "./assets/styles.css";

// Buscamos el elemento con id 'root' en nuestro HTML y creamos un root de React
ReactDOM.createRoot(document.getElementById('root')).render(
  // React StrictMode activa comprobaciones adicionales en desarrollo
  <React.StrictMode>
    {/* BrowserRouter envuelve la app para habilitar rutas */}
    <BrowserRouter>
      {/* Componente principal de la aplicación */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
