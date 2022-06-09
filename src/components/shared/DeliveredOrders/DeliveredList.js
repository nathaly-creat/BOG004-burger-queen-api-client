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
        <tbody className="waiter-orders-total" key={order.id.toString()}>
          <tr>
            <td>{order.id}</td>
            <td>{order.client}</td>
            <td>{order.totalPrice}</td>
            <td>{order.dateEntry}</td>
            <td>{order.dateProcessed}</td>
            <td data-testid='time-total'>{totalTime} min</td>
          </tr>
        </tbody>
    );
  });

  return <>{ordersDeliveredList}</>;
};
