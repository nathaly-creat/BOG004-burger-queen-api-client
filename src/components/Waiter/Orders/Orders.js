// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersPetition } from '../../../api/petitionsFetch.js';
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
    totalOrdersPetition(activeSessionToken)
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

  // estructura de hook para para visualizar ordenes cada seg
  useEffect(() => {
    const interval = setInterval(() => {
      getDeliveringOrders();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OrderLists orders={orders}/>
      <section className='waiter-orders-to-serve'>
        <OrderToServer orders={orders} token={activeSessionToken} />
      </section>
    </>
  );
};
