// COMPONENTE ORDERPRODUCTS PARA MOSTRAR LISTA DE PRODUCTOS TOTALES EN EL PEDIDO
export const OrderProducts = ({ products }) => {
  return products.map((prod) => (
    <ul key={prod.product.name.toString()}>
      <li>
        {prod.qty} - {prod.product.name}
      </li>
    </ul>
  ));
};
