// COMPONENTE ORDERPRODUCTS PARA MOSTRAR LISTA DE PRODUCTOS TOTALES EN EL PEDIDO.
export const OrderProducts = (props) => {
  
  // declaracion de lista de productos a preparar
  const orderProductList = props.products;

  // captura de lista de productos 
  let ordersToCookChef = orderProductList.map((prod) => {
      return (
        <ul key={prod.product.name.toString()}>
          <li>{prod.qty} - {prod.product.name}</li>
        </ul>
      );
    }
  );

  return (
    <>
      {ordersToCookChef}
    </>
  );
}
