// IMPORTACION HOOKS Y OTROS
import { useCart } from 'react-use-cart';
import { onlyProductFetch } from '../../../api/petitionsFetch.js';
import { useFormCustHook } from '../../../hooks/useFormCustHook.js';
import { ProductsToBill } from './ProductsToBill.js';

// COMPONENTE PARA MOSTRAR ORDEN DE CLIENTE
export const OrderContainer = (props) => {

  // estructura de hook para cambio en input de nombre cliente
  const [inputNameCus, handleInputChange] = useFormCustHook({
    customerName: '',
  });

  // desestructuracion de formLoginValues
  const { customerName } = inputNameCus;

  // se declaran los metodos para actualización de productos a ordenar
  const { cartTotal, emptyCart } = useCart();

  // funcion para crear objeto para peticion de orders
  const totalProductsToBill = () => {
    // extraccion de productos seleccionados de localStorage 
    let total = localStorage.getItem('react-use-cart');
    if (total !== null) {
      total = JSON.parse(total).items;
    }
    console.log('objt', total);

    let products = [];

    // declaracion id | token empleado
    const userId = props.activeSession.user.id;
    const token = props.activeSession.accessToken;

    // ciclo para recorrer productos a ordenar
    for (let product of total) {
      onlyProductFetch(token, product.id)
        .then((response) => {
          products.push({ qty: product.quantity, product: response });
          let pruebaOBJ = {
            userId: userId,
            client: customerName,
            products: products,
            status: 'pending', // REVISAR SI SE DEBE O NO COLOCAR 
            dataEntry: new Date(), // REVISAR SI SE DEBE O NO COLOCAR 
          };
          console.log('funciona por faaaa', pruebaOBJ);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className='waiter-order-container'>
        <input
          type='text'
          name='customerName'
          placeholder='Nombre del cliente'
          autoComplete='off'
          value={customerName}
          onChange={handleInputChange}
        ></input>
        <ProductsToBill/>
        <div className='col-auto ms-auto'>
          <h2>Total: $ {cartTotal}</h2>
        </div>
        <div className='col-auto'>
          <button className='btn btn-danger m-2' onClick={() => emptyCart()}>
            Cancelar
          </button>
          <button
            className='btn btn-warning m-2'
            onClick={() => totalProductsToBill()}
          >
            Ordenar
          </button>
        </div>
      </div>
    </>
  );
};
