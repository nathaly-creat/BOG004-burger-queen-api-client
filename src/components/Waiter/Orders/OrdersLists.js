// COMPONENTE PARA MOSTRAR PEDIDOS PENDIENTES
export const OrderLists = ({orders}) => {

  // captura de ordenes con status pending
  let pendingOrders = orders.map((order) => {
    let statusPending;
    if (order.status === 'pending') {
      statusPending = (
        <div className='waiter-card-body-orders' key={order.id.toString()}>
              <p>{order.id}</p>
              <p className='waiter-card-title'>{order.client}</p>
              <p>{order.dateEntry}</p>
        </div>
      );
    }
    return statusPending;
  });

  return (
    <>
      <section className='waiter-orders-pending'>
        <p>Pedidos en preparación</p>
        <div>{pendingOrders}</div>
      </section>
    </>
  );
};
