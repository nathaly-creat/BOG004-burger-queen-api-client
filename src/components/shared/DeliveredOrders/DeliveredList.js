// COMPONENTE COMPARTIDO PARA LISTA DE ORDENES ENTREGADAS
export const DeliveredList = ({ orders }) => {

  // filtro de pedidos entregados
  let filterOrders = orders.filter((order) => order.status === "delivered");

  // organizacion de pedidos entregados segun fecha de procesado
  const sortedOrders = filterOrders.sort((last, first) => {
    let firstDate = new Date(first.dateProcessed);
    let lastDate = new Date(last.dateProcessed);
    return firstDate - lastDate;
  });

  // transformacion de pedidos para elemento html
  let ordersDeliveredList = sortedOrders.map((order) => {
    // obtencion tiempo total de preparacion y entrega del pedido
    const totalTime = Math.round(
      Math.abs(new Date(order.dateProcessed) - new Date(order.dateEntry)) /
        (1000 * 60)
    );

    return (
      <div className="card mb-3" key={order.id.toString()}>
        <div className="col-md-8">
          <div className="waiter-card-body">
            <p>{order.id}</p>
            <p>{order.client}</p>
            <p>{order.totalPrice}</p>
            <p>{order.dateEntry}</p>
            <p>{order.dateProcessed}</p>
            <p>{totalTime} min</p>
          </div>
        </div>
      </div>
    );
  });

  return <>{ordersDeliveredList}</>;
};
