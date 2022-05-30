export const OrderLists = (props) => {
  // declaracion de lista de productos
  const orders = props.orders;

  // captura de productos de almuerzo
  let mostrarPedidos = orders.map((order) => {
    let statusPending;
    if (order.status === "pending" && order.cooked === false) {
      statusPending = (
        <div className="card mb-3" key={order.id.toString()}>
            <div className="col-md-8">
              <div className="waiter-card-body">
                <p>{order.id}</p>
                <p className="waiter-card-title">{order.client}</p>
                <p>{order.status}</p>
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
        <div className="">{mostrarPedidos}</div>
      </section>
    </>
  );
};
