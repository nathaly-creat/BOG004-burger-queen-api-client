// IMPORTACION HOOKS Y OTROS
import { statusDeliveredPetition } from "../../../api/petitionsFetch.js";
import { Table, Col } from "react-bootstrap";

// COMPONENTE PARA MOSTRAR PEDIDOS LISTOS PARA SERVIR
export const OrderToServer = ({ orders, token }) => {
  // captura de ordenes con status delivering
  return (
    <>
      <h2 data-testid="orders-to-deliver">Pedidos listos para entregar</h2>
      <Col lg={11}>
        <Table light="true" key={orders}>
          <thead>
            <tr>
              <th>id</th>
              <th>Cliente</th>
              <th>Hora Pedido</th>
              <th>Estatus</th>
            </tr>
          </thead>
          {orders.map((order) => {
            let statusDelivering = order.status === "delivering";
            if (statusDelivering) {
              return (
                <tbody key={order.id.toString()}>
                  <tr data-testid="order-to-delivered">
                    <th scope="row">{order.id}</th>
                    <td>{order.client}</td>
                    <td>{order.dateEntry}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          statusDeliveredPetition(
                            order.id,
                            token,
                            new Date().toLocaleString("sv")
                          )
                        }
                      >
                        Entregar pedido
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            } else {
              return null;
            }
          })}
        </Table>
      </Col>
    </>
  );
};

// // IMPORTACION HOOKS Y OTROS
// import { statusDeliveredPetition } from '../../../api/petitionsFetch.js';

// // COMPONENTE PARA MOSTRAR PEDIDOS LISTOS PARA SERVIR
// export const OrderToServer = ({ orders, token }) => {

//   // captura de ordenes con status delivering
//   let ordersToDeliver = orders.map((order) => {
//     let statusDelivering;
//     if (order.status === 'delivering') {
//       statusDelivering = (
//         <div className='waiter-card-body' key={order.id.toString()} data-testid='order-to-delivered'>
//           <p>{order.id}</p>
//           <p className='waiter-card-title'>{order.client}</p>
//           <p>{order.dateEntry}</p>
//           <button
//             className='btn btn-success'
//             onClick={() =>
//               statusDeliveredPetition(
//                 order.id,
//                 token,
//                 new Date().toLocaleString('sv')
//               )
//             }
//           >Entregar pedido</button>
//         </div>
//       );
//     }
//     return statusDelivering;
//   });

//   return (
//     <div className='waiter-orders-to-serve' data-testid='orders-to-deliver'>
//       <p>Pedidos listos para entregar</p>
//       {ordersToDeliver}
//     </div>
//   );
// };
