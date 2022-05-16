// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContainer } from '../views/loginContainer.js';
import { KitchenContainer } from '../views/kitchenContainer.js';
import { WaiterContainer } from '../views/waiterContainer.js';
import { NotFound } from '../views/notFound.js';

// ROUTER
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginContainer/>} />
        <Route path='/kitchen' element={<KitchenContainer/>} />
        <Route path='/waiter' element={<WaiterContainer/>} />
        <Route path='*' element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
};

// declarar funciones de public y private

// const Public = () => <div>public</div>;
// const Private = () => <div>private</div>;