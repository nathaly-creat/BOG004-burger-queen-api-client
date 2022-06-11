// IMPORTACION HOOKS Y OTROS
import { statusDeliveredPetition } from '../../../api/petitionsFetch.js';

// COMPONENTE PARA MOSTRAR PEDIDOS LISTOS PARA SERVIR
export const OrderToServer = ({ orders, token }) => {

  // captura de ordenes con status delivering
  let ordersToDeliver = orders.map((order) => {
    let statusDelivering;
    if (order.status === 'delivering') {
      statusDelivering = (
        <div className='waiter-card-body' key={order.id.toString()} data-testid='order-to-delivered'>
          <p>{order.id}</p>
          <p className='waiter-card-title'>{order.client}</p>
          <p>{order.dateEntry}</p>
          <button
            className='btn btn-success'
            onClick={() =>
              statusDeliveredPetition(
                order.id,
                token,
                new Date().toLocaleString('sv')
              )
            }
          >Entregar pedido</button>
        </div>
      );
    }
    return statusDelivering;
  });

  return (
    <div className='waiter-orders-to-serve' data-testid='orders-to-deliver'>
      <p>Pedidos listos para entregar</p>
      {ordersToDeliver}
    </div>
  );
};
