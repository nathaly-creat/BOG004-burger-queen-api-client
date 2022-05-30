// Componente de Pedidos Listos para entregar.
export const OrderToServer = (props) => {
    const orders = props.orders;

    let ordersDelivered = orders.map((order) => {
        let statusPending;
        if (order.status === "pending" && order.cooked === true) {
          statusPending = (
            <div className="card mb-3" key={order.id.toString()}>
                <div className="col-md-8">
                  <div className="waiter-card-body">
                    <p>{order.id}</p>
                    <p className="waiter-card-title">{order.client}</p>
                    <p>{order.dateProcessed}</p>
                  </div>
                </div>
              </div>
          );
        }
        return statusPending;
      });
  
  
    return (
    <div className="waiter-orders-to-serve">
        <p>Pedidos listos para entregar</p>
        {ordersDelivered}

    </div>
  )
}
