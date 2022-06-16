// import { card } from "react-bootstrap";
// COMPONENTE PARA MOSTRAR PEDIDOS PENDIENTES
export const OrderLists = ({ orders }) => {
  // captura de ordenes con status pending
  let pendingOrders = orders.map((order) => {
    let statusPending;
    if (order.status === "pending") {
      statusPending = (
        <div className="waiter-card-body-orders" key={order.id.toString()}>
          <p>{order.id}</p>
          <p className="waiter-card-title">{order.client}</p>
          <p>{order.dateEntry}</p>
          {/* <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{order.id}</li>
              <li class="list-group-item">{order.client}</li>
              <li class="list-group-item">{order.dateEntry}</li>
            </ul>
          </div> */}
        </div>
      );
    }
    return statusPending;
  });

  return (
    <>
      <section className="waiter-orders-pending">
        <p>Pedidos en preparación</p>
        <div>{pendingOrders}</div>
      </section>
    </>
  );
};
