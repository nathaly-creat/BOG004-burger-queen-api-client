// IMPORTACIONES DE REACT PARA INICIALIZACION 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router.js';
import './styles/index.css'

// ENLACE DE RUTAS PARA CONTENIDO DE DIV EN HTML
const root = ReactDOM.createRoot(document.querySelector('#app'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    </React.StrictMode>
);
