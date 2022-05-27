// IMPORTACION HOOKS Y OTROS
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import { onlyProductFetch, orderFetch } from '../../../api/petitionsFetch.js';
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

  // funcion para formato de fecha
  const dateFormat = (receivedDate) => {
    let fullDateArray = receivedDate.split(',');
    let dateArray = fullDateArray[0].split('/');

    let day, month;
    switch (true) {
      case dateArray[0].length !== 2 && dateArray[1].length !== 2:
        day = dateArray[0].padStart(2, '0');
        month = dateArray[1].padStart(2, '0');
        break;
      case dateArray[0].length !== 2:
        day = dateArray[0].padStart(2, '0');
        month = dateArray[1];
        break;
      case dateArray[1].length !== 2:
        day = dateArray[0];
        month = dateArray[1].padStart(2, '0');
        break;
      default:
        day = dateArray[0];
        month = dateArray[1];
        break;
    }

    let newFormat = dateArray[2].concat('-', day).concat('-', month).concat('', fullDateArray[1]);
    return (newFormat)
  }

  // funcion para crear objeto para peticion de orders
  const totalProductsToBill = () => {
    // fecha y hr de orden
    const orderDate = dateFormat(new Date().toLocaleString());

    // extraccion de productos seleccionados de localStorage 
    let total = localStorage.getItem('react-use-cart');
    if (total !== null) {
      total = JSON.parse(total).items;
    }
    
    // declaracion de array para agregar productos
    let products = [];

    // declaracion id | token empleado
    const userId = props.activeSession.user.id;
    const token = props.activeSession.accessToken;

    // ciclo para recorrer productos a ordenar
    for (let product of total) {
      onlyProductFetch(token, product.id)
        .then((response) => {
          products.push({ qty: product.quantity, product: response });
          const orderPetitionObj = {
            userId: userId,
            client: customerName,
            products: products,
            status: 'pending',
            dateEntry: orderDate,
          };
          if(products.length === total.length){
            orderFetch(token,orderPetitionObj);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // estructura de hook para mostrar error de login
  const [inputNameError, setInputNameError] = useState('');

  // funcion para validar nombre diferente de vacio
  const nameValidation = () => {
    if(customerName!==''){
      totalProductsToBill();
    }else{
      setInputNameError('nombre cliente requerido')
    }
  }

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
        <span>{inputNameError}</span>
        <ProductsToBill/>
        <h2>Total: $ {cartTotal}</h2>
        <div>
          <button className='btn btn-danger m-2' onClick={() => emptyCart()}>
            Cancelar
          </button>
          <button
            type='button'
            className='btn btn-warning m-2'
            onClick={ () => nameValidation()}
          >Ordenar</button>
        </div>
      </div>
    </>
  );
};
