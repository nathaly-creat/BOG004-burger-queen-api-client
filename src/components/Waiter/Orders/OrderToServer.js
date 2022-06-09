// IMPORTACION DE FUNCION PARA FORMATO DE FECHA
// Y PETICION FETCH DE ESTATUS DEL PEDIDO.
import { statusDeliveredFetch } from '../../../api/petitionsFetch.js';

// COMPONENTE PARA MOSTRAR PEDIDOS LISTOS PARA SERVIR
export const OrderToServer = ({ orders, token }) => {
  let ordersDelivered = orders.map((order) => {
    let statusCooked;
    if (order.status === 'delivering') {
      statusCooked = (
        <div className='waiter-card-body' key={order.id.toString()} data-testid='order-to-delivered'>
          <p>{order.id}</p>
          <p className='waiter-card-title'>{order.client}</p>
          <p>{order.dateEntry}</p>
          <button
            className='btn btn-success'
            onClick={() =>
              statusDeliveredFetch(
                order.id,
                token,
                new Date().toLocaleString('sv')
              )
            }
          >Entregar pedido</button>
        </div>
      );
    }
    return statusCooked;
  });

  return (
    <div className='waiter-orders-to-serve' data-testid='orders-to-delivery'>
      <p>Pedidos listos para entregar</p>
      {ordersDelivered}
    </div>
  );
};
       