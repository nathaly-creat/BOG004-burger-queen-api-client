// IMPORTACIONES DE REACT PARA ROUTER | VISTAS
import { Routes, Route } from 'react-router-dom';
import { AdminView } from '../views/AdminView.js';
import { KitchenView } from '../views/KitchenView.js';
import { WaiterView } from '../views/WaiterView.js';
import { NotFoundView } from '../views/NotFoundView.js';
import { WithoutAccess } from '../components/shared/WithoutAccess.js';

// ROUTER
export const RolesRoutes = () => {
  const activeUser = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
      <Routes>
        {
          activeUser.user.roles.admin 
            ? (<Route path='/admin' element={<AdminView/>}/>)
            : (<Route path='/*' element={<WithoutAccess/>}/>)
        }
        {
          activeUser.user.roles.waiter
            ? (<Route path='/waiter' element={<WaiterView/>}/>)
            : (<Route path='/*' element={<WithoutAccess/>}/>)
        }
        {
          activeUser.user.roles.kitchen
            ? (<Route path='/kitchen' element={<KitchenView/>}/>)
            : (<Route path='/*' element={<WithoutAccess/>}/>)
        }
        <Route path='/*' element={<NotFoundView/>} /> 
      </Routes>
    </>
  );
};
