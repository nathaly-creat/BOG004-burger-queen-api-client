// COMPONENTE ORDERPRODUCTS PARA MOSTRAR LISTA DE PRODUCTOS TOTALES EN EL PEDIDO
export const OrderProducts = ({products}) => {
  
  // estructura html de lista de productos 
  let ordersToCookChef = products.map((prod) => {
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
};
