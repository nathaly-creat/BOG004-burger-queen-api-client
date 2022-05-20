// COMPONENTE PARA MOSTRAR PRODUCTOS
export const ProductList = (props) => {
  console.log(props);
  const products = props.products;
  const listProducts = products.map((product) =>
    <li key={product.id.toString()}>
      {product.name}
      {product.price}
      <img src={product.image} alt='products'/>
    </li>
  );
  return (
    <ul>{listProducts}</ul>
  );
}
