// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { Routes, Route } from 'react-router-dom';
import { LoginContainer } from './views/loginContainer.js';
import { KitchenContainer } from './views/kitchenContainer.js';
import { WaiterContainer } from './views/waiterContainer.js';

// ROUTER
export default function Router() {
  return (
      <Routes>
        <Route path='/' element={<LoginContainer/>} />
        <Route path='/kitchen' element={<KitchenContainer/>} />
        <Route path='/waiter' element={<WaiterContainer/>} />
      </Routes>
  );
};
