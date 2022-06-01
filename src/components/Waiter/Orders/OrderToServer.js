// IMPORTACION DE FUNCION PARA FORMATO DE FECHA
// Y PETICION FETCH DE ESTATUS DEL PEDIDO.
import { statusDeliveredFetch } from '../../../api/petitionsFetch.js';

// COMPONENTE PARA MOSTRAR PEDIDOS LISTOS PARA SERVIR
export const OrderToServer = ({orders,token}) => {

  let ordersDelivered = orders.map((order) => {
    let statusCooked;
    if (order.status === '' && order.cooked === true) {
      statusCooked = (
        <div className='card mb-3' key={order.id.toString()}>
          <div className='col-md-8'>
            <div className='waiter-card-body'>
              <p>{order.id}</p>
              <p className='waiter-card-title'>{order.client}</p>
              <p>{order.dateEntry}</p>
              <button
                className='btn btn-primary'
                onClick={ () => 
                  statusDeliveredFetch(order.id, token, new Date().toLocaleString('sv'))
                }
              >Entregar pedido</button>
            </div>
          </div>
        </div>
      );
    }
    return statusCooked;
  });

  return (
    <div className='waiter-orders-to-serve'>
      <p>Pedidos listos para entregar</p>
      {ordersDelivered}
    </div>
  );
};
