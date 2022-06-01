// COMPONENTE PARA MOSTRAR PEDIDOS PENDIENTES
export const OrderLists = ({orders}) => {

  // captura de ordenes con status pending
  let ordersPending = orders.map((order) => {
    let statusPending;
    if (order.status === 'pending' && order.cooked === false) {
      statusPending = (
        <div className='card mb-3' key={order.id.toString()}>
          <div className='col-md-8'>
            <div className='waiter-card-body'>
              <p>{order.id}</p>
              <p className='waiter-card-title'>{order.client}</p>
              <p>{order.dateEntry}</p>
            </div>
          </div>
        </div>
      );
    }
    return statusPending;
  });

  return (
    <>
      <section className='waiter-orders-pending'>
        <p>Pedidos en preparación</p>
        <div>{ordersPending}</div>
      </section>
    </>
  );
};
