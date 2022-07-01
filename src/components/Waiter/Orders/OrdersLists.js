// COMPONENTE PARA MOSTRAR PEDIDOS PENDIENTES
export const OrderLists = ({ orders }) => {
  return (
    <>
      <section className='waiter-orders-pending'>
        <h3>Pedidos pendientes</h3>
        <div className='waiter-orders-pending-cards'>
          {orders
            .filter((ord) => ord.status === 'pending')
            .map((order) => (
              <ul className='waiter-orders-pending-card' key={order.id.toString()}>
                <li className='card-header'>Orden: {order.id}</li>
                <div className='card-body'>
                  <li data-testid='card-body-name'>Cliente: {order.client}</li>
                  <li>Hr pedido: {order.dateEntry}</li>
                  <li className='card-body-status-pending'>Estatus: {order.status}</li>
                </div>
              </ul>
            ))}
        </div>
      </section>
    </>
  );
};
