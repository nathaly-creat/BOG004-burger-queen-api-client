// IMPORTACIONES DE REACT PARA INICIALIZACION Y ROUTER
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router/appRouter.js';
import './styles/index.css'

// ENLACE DE RUTAS PARA CONTENIDO DE DIV EN HTML
const root = ReactDOM.createRoot(document.querySelector('#app'));

root.render(
    <React.StrictMode>
        <Router/>
    </React.StrictMode>
);
