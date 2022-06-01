// COMPONENTE COMPARTIDO PARA LISTA DE ORDENES ENTREGADAS
export const DeliveredList = ({orders}) => {

  // declaracion de lista de productos entregados
  let ordersDeliveredList = orders.map((order) => {
    
    // obtencion tiempo total de preparacion y entrega del pedido
    const totalTime = Math.round(
      Math.abs(new Date(order.dateProcessed) - new Date(order.dateEntry)) /
        (1000 * 60)
    );

    let statusDelivered;
    if (order.status === 'delivered' && order.cooked === true) {
      statusDelivered = (
        <div className='card mb-3' key={order.id.toString()}>
          <div className='col-md-8'>
            <div className='waiter-card-body'>
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
    }
    return statusDelivered;
  });

  return(
    <>
      {ordersDeliveredList}
    </>
  );
};
