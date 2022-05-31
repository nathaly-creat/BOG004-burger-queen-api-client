// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { Routes, Route } from 'react-router-dom';

// inicio vistas admin
import { AdminView } from '../views/AdminView.js';
// fin vistas admin

// inicio vistas kitchen
import { KitchenView } from '../views/KitchenView.js';
import { OrdersToCook } from '../components/Kitchen/OrdersToCook/OrdersToCook.js';
// fin vistas kitchen

// inicio vistas waiter
import { WaiterView } from '../views/WaiterView.js';
import { NewOrder } from '../components/Waiter/NewOrder/NewOrder.js';
import { Orders } from '../components/Waiter/Orders/Orders.js';
import { DeliveredOrders } from '../components/shared/DeliveredOrders/DeliveredOrders.js';
// fin vistas waiter

import { WithoutAccess } from '../components/shared/WithoutAccess.js';

// ROUTER SEGUN USUARIO ACTIVO
export const RolesRoutes = () => {
  const activeUser = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
      <Routes>
        {
          activeUser?.user.roles.admin
            ? (<Route path='admin' element={<AdminView/>}/>)
            : (<Route path='*' element={<WithoutAccess/>}/>)
        }
        {
          activeUser?.user.roles.waiter
            ? (
              <Route path='waiter' element={<WaiterView/>}>
                  <Route index element={<NewOrder/>}></Route>
                  <Route path='orders' element={<Orders/>}></Route>
                  <Route path='delivered-orders' element={<DeliveredOrders/>}></Route>
              </Route> 
              )
            : (<Route path='*' element={<WithoutAccess/>}/>)
        }
        {
          activeUser?.user.roles.kitchen
            ? (
              <Route path='kitchen' element={<KitchenView/>}>
                <Route index element={<OrdersToCook/>}></Route>
                <Route path='delivered-orders' element={<DeliveredOrders/>}></Route>
              </Route>
              )
            : (<Route path='*' element={<WithoutAccess/>}/>)
        }
        <Route path='*' element={<WithoutAccess/>} /> 
      </Routes>
    </>
  );
};
