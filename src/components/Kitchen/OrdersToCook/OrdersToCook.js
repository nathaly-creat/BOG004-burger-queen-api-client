// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersFetch } from '../../../api/petitionsFetch.js';
import { OrderToCookList } from './OrderToCookList.js'

// COMPONENTE ORDERSTOCOOK PARA KITCHEN
export const OrdersToCook = () => {
  
  // estructura de hook para traer pedidos a preparar
  const [orders, setOrders] = useState([]);

  // extraccion de token 
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // estructura de hook para peticion pedidos totales a preparar
  useEffect(() => {
    totalOrdersFetch(activeSessionToken)
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeSessionToken, setOrders]);

  return (
    <>
      <OrderToCookList orders={orders} token={activeSessionToken}/>
    </>
  )
}
