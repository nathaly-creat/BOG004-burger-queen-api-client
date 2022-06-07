// IMPORTACION HOOKS Y OTROS
import { useCart } from 'react-use-cart';

// COMPONENTE PARA MOSTRAR PRODUCTOS A ORDENAR EN FORMA DE TABLA
export const ProductsToBill = () => {

  // se declaran los metodos para actualización de productos a ordenar
  const { items, updateItemQuantity, removeItem } = useCart();
  
  // captura de productos para facturar
  const prodsToBill = items.map((product, index) => {
    return (
      <div key={index} className='waiter-order-products'>
        <table className='table table-dark'>
          <tbody>
            <tr>
              <td>
                <img src={product.image} style={{ width: '4rem' }} alt=''/>
              </td>
              <td className='waiter-order-products-text'>{product.name}</td>
              <td className='waiter-order-products-btns-qty'>
                <button
                  className='btn-info ms-2'
                  onClick={() =>
                    updateItemQuantity(product.id, product.quantity - 1)
                  }
                >-</button>
                <p className='waiter-order-products-text'>{product.quantity}</p>
                <button
                  className='btn-info ms-2'
                  onClick={() =>
                    updateItemQuantity(product.id, product.quantity + 1)
                  }
                >+</button>
              </td>
              <td className='waiter-order-products-text'>{product.price}</td>
              <td>
                <button
                  className='btn btn-light ms-2'
                  onClick={() => removeItem(product.id)}
                ><i className='fa-regular fa-trash-can'></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });

  return (
    <>
      {prodsToBill}
    </>
  );
}
