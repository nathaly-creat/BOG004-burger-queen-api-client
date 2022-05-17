// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginView } from '../views/LoginView.js';
import { KitchenView } from '../views/KitchenView.js';
import { WaiterView } from '../views/WaiterView.js';
import { NotFoundView } from '../views/NotFoundView.js';

// ROUTER
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView/>} />
        <Route path='/kitchen' element={<KitchenView/>} />
        <Route path='/waiter' element={<WaiterView/>} />
        <Route path='*' element={<NotFoundView />} /> 
      </Routes>
    </BrowserRouter>
  );
};

// declarar funciones de public y private

// const Public = () => <div>public</div>;
// const Private = () => <div>private</div>;