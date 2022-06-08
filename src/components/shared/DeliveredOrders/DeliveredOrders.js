// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from "react";
import { totalOrdersFetch } from "../../../api/petitionsFetch.js";
import { DeliveredList } from "./DeliveredList.js";

// COMPONENTE COMPARTIDO DE ORDENES ENTREGADAS
export const DeliveredOrders = () => {
  // estructura de hook para extraccion de lista de pedidos entregados
  const [ordersDelivered, setOrdersDelivered] = useState([]);

  // captura del token del usuario activo
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // funcion para peticion de pedidos totales a preparar
  const getDeliveredOrders = async () => {
    totalOrdersFetch(activeSessionToken)
      .then((response) => {
        setOrdersDelivered(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // estructura de hook para peticion pedidos entregados
  useEffect(() => {
    getDeliveredOrders();
  }, []);

  // estructura de hook para peticion cada 3 seg de pedidos entregados
  useEffect(() => {
    const interval = setInterval(() => {
      getDeliveredOrders();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="waiter-kitchen-selected-component">
        <table className='table table-dark'>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Cliente</th>
              <th scope="col">Precio Total</th>
              <th scope="col">Hora Pedido</th>
              <th scope="col">Hora Entregado</th>
              <th scope="col">Tiempo Total</th>
            </tr>
          </thead>
          <DeliveredList orders={ordersDelivered} />
        </table>
      </div>
    </>
  );
};
