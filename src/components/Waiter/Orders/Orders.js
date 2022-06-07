// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersFetch } from '../../../api/petitionsFetch.js';
import { OrderLists } from './OrdersLists.js';
import { OrderToServer } from './OrderToServer.js';

// COMPONENTE PARA MOSTRAR PEDIDOS PENDIENTES Y PEDIDOS LISTOS PARA SERVIR
export const Orders = () => {

  // estructura de hook para traer las ordenes
  const [orders, setOrders] = useState([]);

  // token usuario activo
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // funcion para peticion de pedidos totales a preparar
  const getDeliveringOrders = async () => {
    totalOrdersFetch(activeSessionToken)
    .then((response) => {
      setOrders(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // estructura de hook para peticion de ordenes listas a entregar
  useEffect(() => {
    getDeliveringOrders();
  }, []);

  // estructura de hook para peticion cada 3 seg de ordenes listas a entregar
  useEffect(() => {
    const interval = setInterval(() => {
      getDeliveringOrders();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <OrderLists orders={orders}/>
      <OrderToServer orders={orders} token={activeSessionToken}/>
    </>
  );
};
