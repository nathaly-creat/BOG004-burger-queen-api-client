// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersPetition } from '../../../api/petitionsFetch.js';
import { OrderToCookList } from './OrderToCookList.js'

// COMPONENTE ORDERSTOCOOK PARA KITCHEN
export const OrdersToCook = () => {

  // extraccion de token 
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;
  
  // estructura de hook para declarar pedidos a preparar
  const [orders, setOrders] = useState([]);

  // funcion para peticion de pedidos totales a preparar
  const getPendingOrders = async () => {
    totalOrdersPetition(activeSessionToken)
    .then((response) => {
      setOrders(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // estructura de hook para visualizar pedidos a preparar
  useEffect(() => {
    getPendingOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // estructura de hook para para visualizar pedidos a preparar cada seg
  useEffect(() => {
    const interval = setInterval(() => {
      getPendingOrders();
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='kitchen-orders-component' data-testid='oders-to-cook-component'>
      <OrderToCookList orders={orders} token={activeSessionToken}/>
    </div>
  )
}
