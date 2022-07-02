// IMPORTACION HOOKS Y OTROS
import { useCart } from 'react-use-cart';

// COMPONENTE PARA MOSTRAR PRODUCTOS A ORDENAR EN FORMA DE TABLA
export const ProductsToBill = () => {
  // se declaran los metodos para actualización de productos a ordenar
  const { items, updateItemQuantity, removeItem } = useCart();

  return (
    <table className='waiter-order-products' data-testid='orders-to-deliver'>
      <tbody>
        {items.map((product, index) => (
          <tr key={index}>
            <td>
              <img
                className='waiter-order-products-img'
                src={product.image}
                alt='product-img'
              />
            </td>
            <td className='waiter-order-products-text'>{product.name}</td>
            <td className='waiter-order-products-btns-qty'>
              <button
                className='btn-decrease'
                onClick={() =>
                  updateItemQuantity(product.id, product.quantity - 1)
                }
                data-testid='decrease-quantity'
              >-</button>
              <p data-testid='product-quantity'>{product.quantity}</p>
              <button
                className='btn-increase'
                onClick={() =>
                  updateItemQuantity(product.id, product.quantity + 1)
                }
                data-testid='increase-quantity'
              >+</button>
            </td>
            <td className='waiter-order-products-text'>{product.price}</td>
            <td>
              <button
                className='btn-delete btn-light ms-2'
                onClick={() => removeItem(product.id)}
              >
                <i className='fa-regular fa-trash-can'></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
