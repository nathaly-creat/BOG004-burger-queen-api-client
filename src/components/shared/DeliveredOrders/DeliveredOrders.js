// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { totalOrdersPetition } from '../../../api/petitionsFetch.js';
import { DeliveredList } from './DeliveredList.js';
import { Table, Col} from 'react-bootstrap';

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

  // estructura de hook para para visualizar pedidos entregados cada 5 seg
  useEffect(() => {
    const interval = setInterval(() => {
      getDeliveredOrders();
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Col lg={11} className='waiter-kitchen-selected-component'>
        <Table dark= "true" className='waiter-kitchen-selected-component-table' responsive="sm">
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Cliente</th>
              <th scope='col'>Precio Total</th>
              <th scope='col'>Hora Pedido</th>
              <th scope='col'>Hora Entregado</th>
              <th scope='col'>Tiempo Total</th>
            </tr>
          </thead>
          <DeliveredList orders={ordersDelivered} />
        </Table>
      </Col>
    </>
  );
};
