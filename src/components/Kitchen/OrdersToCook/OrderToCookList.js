// IMPORTACION HOOKS Y OTROS
import { statusDeliveringFetch } from '../../../api/petitionsFetch.js';
import { OrderProducts } from './OrderProducts.js';

// COMPONENTE ORDERSTOCOOKLIST PARA MOSTRAR ESTRUCTURA DE CARD
export const OrderToCookList = ({orders,token}) => {

  // captura de pedidos a preparar
  let ordersToCookChef = orders.map((order) => {
    let statusPendingToCook;
    if(order.status === 'pending') {
      statusPendingToCook = (
      <div className='card kitchen-orders' key={order.id.toString()}>
        <div className='card-body'>
          <h5 className='card-title'>Orden N° {order.id}</h5>
          <p className='card-text'>Cliente: {order.client}</p>
          <p className='card-text' data-testid = 'date-entry'>Hora orden: {order.dateEntry}</p>
          <p className='card-text'>Pedido:</p>
          <OrderProducts products={order.products}/>
          <button 
            className='btn btn-primary'
            onClick={() => statusDeliveringFetch(order.id, token)}
          >¿Pedido Listo?</button>
        </div>
      </div>
      );
    }
    return statusPendingToCook;
  });

  return (
    <>
      {ordersToCookChef}
    </>
  );
};
