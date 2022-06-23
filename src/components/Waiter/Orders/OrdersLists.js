// COMPONENTE PARA MOSTRAR PEDIDOS PENDIENTES
export const OrderLists = ({ orders }) => {
  // captura de ordenes con status pending
  let pendingOrders = orders.map((order) => {
    let statusPending;
    if (order.status === "pending") {
      statusPending = (
          <ul className="waiter-card-body-orders" key={order.id.toString()}>
            <div className="card-header">
              <li className="li-card-header">Orden: {order.id}</li>
            </div>
            <div className="card-body">
              <li className="waiter-card-title" data-testid="prueba">
                Cliente: {order.client}
              </li>
              <li>Hora de Pedido: {order.dateEntry}</li>
              <li>Estatus: Pendiente</li>
            </div>
          </ul>
      );
    }
    return statusPending;
  });

  return (
    <>
      <section className="waiter-orders-pending">
        <div className="waiter-orders-pending-h2">
          <h2>Pedidos pendientes</h2>
        </div>
        <div className="waiter-orders-pending-card">{pendingOrders}</div>
      </section>
    </>
  );
};
