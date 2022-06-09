// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersFetch } from '../../../api/petitionsFetch.js';
import { OrderLists } from './OrdersLists.js';
import { OrderToServer } from './OrderToServer.js';

// COMPONENTE PARA MOSTRAR PEDIDOS LISTOS PARA SERVIR
export const Orders = () => {

  // token usuario activo
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // estructura de hook para declarar lista de ordenes
  const [orders, setOrders] = useState([]);

  // funcion para peticion de ordenes
  const getDeliveringOrders = async () => {
    totalOrdersFetch(activeSessionToken)
    .then((response) => {
      setOrders(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // estructura de hook para visualizar ordenes
  useEffect(() => {
    getDeliveringOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // estructura de hook para para visualizar ordenes cada 5 seg
  useEffect(() => {
    const interval = setInterval(() => {
      getDeliveringOrders();
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OrderLists orders={orders}/>
      <OrderToServer orders={orders} token={activeSessionToken}/>
    </>
  );
};
