import { Table } from 'react-bootstrap';

// COMPONENTE ORDERPRODUCTS PARA MOSTRAR LISTA DE PRODUCTOS TOTALES EN EL PEDIDO
export const OrderProducts = ({ products }) => {
  return (
    <>
    <Table className='card-details-2-table'>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Items</th>
          </tr>
        </thead>
        {products.map((prod) => (
            <tbody key={prod.product.name.toString()}>
              <tr>
                <td>{prod.qty}</td>
                <td>{prod.product.name}</td>
              </tr>
            </tbody>
          ))}
      </Table>
    </>
  )
};
