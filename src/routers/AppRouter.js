// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginView } from '../views/LoginView.js';
import { RolesRoutes } from './RolesRoutes.js';

// ROUTER PRINCIPAL
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView />}/>
        <Route path='/*' element={<RolesRoutes />} data-testid='change-views-roles'/>
      </Routes>
    </BrowserRouter>
  );
}
