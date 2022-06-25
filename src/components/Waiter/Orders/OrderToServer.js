// IMPORTACION HOOKS Y OTROS
import { statusDeliveredPetition } from "../../../api/petitionsFetch.js";
import { Table, Col } from "react-bootstrap";

// COMPONENTE PARA MOSTRAR PEDIDOS LISTOS PARA SERVIR
export const OrderToServer = ({ orders, token }) => {
  // captura de ordenes con status delivering
  return (
    <>
      <h3 data-testid="orders-to-deliver">Pedidos a entregar</h3>
      <Col lg={11}>
        <Table key={orders}>
          <thead>
            <tr>
              <th>id</th>
              <th>Cliente</th>
              <th>Hr pedido</th>
              <th>Estatus</th>
            </tr>
          </thead>
          {orders
            .filter((ord) => ord.status === "delivering")
            .map((order) => (
              <tbody key={order.id.toString()}>
                <tr>
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
                    >Entregar pedido</button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </Col>
    </>
  );
};
