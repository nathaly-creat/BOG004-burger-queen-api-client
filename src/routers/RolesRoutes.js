// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { Routes, Route } from 'react-router-dom';
import { AdminView } from '../views/AdminView.js';
import { KitchenView } from '../views/KitchenView.js';
import { WaiterView } from '../views/WaiterView.js';
import { NotFoundView } from '../views/NotFoundView.js';

// ROUTER
export const RolesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='admin' element={<AdminView/>} />
        <Route path='kitchen' element={<KitchenView/>} />
        <Route path='waiter' element={<WaiterView/>} />
        <Route path='notf' element={<NotFoundView />} /> 
      </Routes>
    </>
  );
};