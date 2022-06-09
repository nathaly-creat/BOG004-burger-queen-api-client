// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersFetch } from '../../../api/petitionsFetch.js';
// import { OrderProducts } from './OrderProducts.js'; statusDeliveringFetch
import { OrderToCookList } from './OrderToCookList.js'

// COMPONENTE ORDERSTOCOOK PARA KITCHEN
export const OrdersToCook = () => {
  
  // estructura de hook para traer pedidos a preparar
  const [orders, setOrders] = useState([]);

  // extraccion de token 
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // funcion para peticion de pedidos totales a preparar
  const getPendingOrders = async () => {
    totalOrdersFetch(activeSessionToken)
    .then((response) => {
      setOrders(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // estructura de hook para peticion pedidos totales a preparar
  useEffect(() => {
    getPendingOrders();
  }, []);

  // estructura de hook para peticion cada 2 seg de pedidos totales a preparar
  useEffect(() => {
    const interval = setInterval(() => {
      getPendingOrders();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid='oders-to-cook-component'>
      <OrderToCookList orders={orders} token={activeSessionToken}/>
    </div>
  )
}
