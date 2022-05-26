import { useCart } from 'react-use-cart';

// COMPONENTE PARA MOSTRAR ORDEN DE CLIENTE
export const OrderContainer = () => {
  const { items, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();

  console.log('otrooooooooooooo', items);

  // captura de productos para facturar
  let productsToBill = items.map((product, index) => {
    return (
      <div key={index}>
        <table className='table table-dark table-borderless'>
          <tbody>
            <tr>
              <td>
                <img src={product.image} style={{ width: '6rem' }} alt='' />
              </td>
              <td>{product.name}</td>
              <td>
                <button
                  className='btn btn-info ms-2'
                  onClick={() =>
                    updateItemQuantity(product.id, product.quantity - 1)
                  }
                >
                  -
                </button>
                <p>{product.quantity}</p>
                <button
                  className='btn btn-info ms-2'
                  onClick={() =>
                    updateItemQuantity(product.id, product.quantity + 1)
                  }
                >
                  +
                </button>
              </td>
              <td>{product.price}</td>
              <td>
                <button
                  className='btn btn-danger ms-2'
                  onClick={() => removeItem(product.id)}
                >
                  Eliminar
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
      <div className='waiter-order-container'>
        <input
          type='text'
          name='customerName'
          placeholder='Nombre del cliente'
          autoComplete='off'
        ></input>
        {productsToBill}
        <div className='col-auto ms-auto'>
          <h2>Total: $ {cartTotal}</h2>
        </div>
        <div className='col-auto'>
          <button className='btn btn-danger m-2' onClick={() => emptyCart()}>
            {' '}
            Cancelar
          </button>
          <button className='btn btn-warning m-2'> Ordenar </button>
        </div>
      </div>
    </>
  );
};

// let value = localStorage.getItem('react-use-cart')
// if(value !== null){
//   value = JSON.parse(value);
//   value.items[0];
// }
