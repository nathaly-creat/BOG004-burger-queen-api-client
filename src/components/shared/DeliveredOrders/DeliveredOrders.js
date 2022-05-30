// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersFetch } from '../../../api/petitionsFetch.js';
import { DeliveredList } from './DeliveredList.js';

export const DeliveredOrders = () => {
  const [ordersDelivered, setOrdersDelivered] = useState([]);

  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;
  
  // estructura de hook para peticion pedidos y agregar los mismos.
  useEffect(() => {
   totalOrdersFetch(activeSessionToken)
      .then((response) => {
        setOrdersDelivered(response);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[activeSessionToken, setOrdersDelivered]);

  return (
   <>
    <div className='waiter-selected-component'>
      <DeliveredList orders={ordersDelivered}/>
    </div>
   </>
 );
}
