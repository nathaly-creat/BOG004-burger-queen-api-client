
export const DeliveredList = (props) => {
    const orders = props.orders;

    let ordersDeliveredList = orders.map((order) => {
        let statusPending;
        const totalTime = ((Math.abs(new Date(order.dateProcessed) - new Date(order.dateEntry)))/(1000*60*60));
        console.log('diferencia', totalTime);
        if (order.status === "delivered" && order.cooked === true) {
          statusPending = (
            <div className="card mb-3" key={order.id.toString()}>
                <div className="col-md-8">
                  <div className="waiter-card-body">
                    <p>{order.id}</p>
                    <p className="waiter-card-title">{order.client}</p>
                    <p>{order.totalPrice}</p>
                    <p>{order.dateEntry}</p>
                    <p>{order.dateProcessed}</p>
                    <p>{totalTime} horas</p>
                  </div>
                </div>
              </div>
          );
        }
        return statusPending;
      });
  
    
  return (
    <div>{ordersDeliveredList}</div>

  )
}
