// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersFetch } from '../../../api/petitionsFetch.js';
import { DeliveredList } from './DeliveredList.js';

// COMPONENTE COMPARTIDO DE ORDENES ENTREGADAS 
export const DeliveredOrders = () => {
  
  // estructura de hook para extraccion de lista de pedidos entregados
  const [ordersDelivered, setOrdersDelivered] = useState([]);
  
  // captura del token del usuario activo
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // estructura de hook para peticion pedidos entregados y asignacion a ordersDelivered
  useEffect(() => {
    totalOrdersFetch(activeSessionToken)
      .then((response) => {
        setOrdersDelivered(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeSessionToken, setOrdersDelivered]);

  return (
    <>
      <div className='waiter-kitchen-selected-component'>
        <DeliveredList orders={ordersDelivered}/>
      </div>
    </>
  );
};
