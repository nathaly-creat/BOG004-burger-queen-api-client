// COMPONENTE COMPARTIDO PARA LISTA DE ORDENES ENTREGADAS
export const DeliveredList = ({ orders }) => {
  // organizacion de pedidos entregados segun fecha de procesado
  const sortedOrders = orders
    .filter((order) => order.status === 'delivered')
    .sort((last, first) => {
      let firstDate = new Date(first.dateProcessed);
      let lastDate = new Date(last.dateProcessed);
      return firstDate - lastDate;
    });

  return (
    <>
      {sortedOrders.map((order) => {
        const totalTime = Math.round(
          Math.abs(new Date(order.dateProcessed) - new Date(order.dateEntry)) /
            (1000 * 60)
        );

        return (
          <tbody className='delivered-tbody' key={order.id.toString()}>
            <tr>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>${order.totalPrice}</td>
              <td>{order.dateEntry}</td>
              <td>{order.dateProcessed}</td>
              <td data-testid='total-time'>{totalTime} min</td>
            </tr>
          </tbody>
        );
      })}
    </>
  );
};
