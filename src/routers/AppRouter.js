// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginView } from '../views/LoginView.js';
import { RolesRoutes } from './RolesRoutes.js';

// ROUTER
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView/>} />
        <Route path='/*' element={<RolesRoutes/>} />
      </Routes>
    </BrowserRouter>
  );
};

// declarar funciones de public y private

// const Public = () => <div>public</div>;
// const Private = () => <div>private</div>;