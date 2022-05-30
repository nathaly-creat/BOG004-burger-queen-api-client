// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersFetch } from '../../../api/petitionsFetch.js';
import { OrderLists } from './OrderLists.js';
import { OrderToServer } from './OrderToServer.js';

export const Orders = () => {
   // estructura de hook para traer los pedidos
   const [orders, setOrders] = useState([]);

   const activeSession = JSON.parse(sessionStorage.user);
   const activeSessionToken = activeSession.accessToken;
   
   // estructura de hook para peticion pedidos y agregar los mismos.
   useEffect(() => {
    totalOrdersFetch(activeSessionToken)
       .then((response) => {
          setOrders(response);
       })
       .catch((error)=>{
         console.log(error);
       })
   },[activeSessionToken, setOrders]);

   return (
    <>
      <OrderLists orders={orders}/>
      <OrderToServer orders={orders}  />
    </>
  );
}
