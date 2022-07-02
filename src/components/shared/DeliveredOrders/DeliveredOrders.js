// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersPetition } from '../../../api/petitionsFetch.js';
import { DeliveredList } from './DeliveredList.js';
import { Table } from 'react-bootstrap';

// COMPONENTE COMPARTIDO DE ORDENES ENTREGADAS
export const DeliveredOrders = () => {
  // captura del token del usuario activo
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // estructura de hook para extraccion de lista de pedidos entregados
  const [ordersDelivered, setOrdersDelivered] = useState([]);

  // funcion para peticion de pedidos entregados
  const getDeliveredOrders = async () => {
    totalOrdersPetition(activeSessionToken)
      .then((response) => {
        setOrdersDelivered(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // estructura de hook para visualizar pedidos entregados
  useEffect(() => {
    getDeliveredOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // estructura de hook para para visualizar pedidos entregados cada seg
  useEffect(() => {
    const interval = setInterval(() => {
      getDeliveredOrders();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Table className='waiter-orders-table'>
        <thead className='delivered-thead'>
          <tr>
            <th>Id</th>
            <th>Cliente</th>
            <th>Precio Total</th>
            <th>Hora Pedido</th>
            <th>Hora Entregado</th>
            <th>Tiempo Total</th>
          </tr>
        </thead>
        <DeliveredList orders={ordersDelivered} />
      </Table>
    </>
  );
};
