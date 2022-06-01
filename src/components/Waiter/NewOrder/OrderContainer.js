// IMPORTACION HOOKS Y OTROS
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import { onlyProductFetch, orderFetch } from '../../../api/petitionsFetch.js';
import { useFormCustHook } from '../../../hooks/useFormCustHook.js';
import { ProductsToBill } from './ProductsToBill.js';

// COMPONENTE PARA MOSTRAR ORDEN DE CLIENTE
export const OrderContainer = ({activeSession}) => {

  // estructura de hook para cambio en input de nombre cliente
  const [inputNameCus, handleInputChange] = useFormCustHook({
    customerName: '',
  });

  // desestructuracion de formLoginValues
  const { customerName } = inputNameCus;

  // se declaran los metodos para actualizacion de productos a ordenar
  const { cartTotal, emptyCart } = useCart();

  // funcion para crear objeto para peticion de orders
  const totalProductsToBill = () => {

    // extraccion de productos seleccionados de localStorage 
    let total = localStorage.getItem('react-use-cart');
    if (total !== null) {
      total = JSON.parse(total).items;
    }
    
    // declaracion de array para agregar productos
    let products = [];

    // declaracion id | token empleado
    const userId = activeSession.user.id;
    const token = activeSession.accessToken;

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
            cooked: false,
            dateEntry: new Date().toLocaleString('sv'),
            totalPrice: cartTotal,
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

  // estructura de hook para mostrar error de login, 
  // en la validacion del input nombre del cliente, inicializa vacio ('')
  const [inputNameError, setInputNameError] = useState('');

  // funcion para validar nombre diferente de vacio
  const nameValidation = () => {
    if(customerName !== ''){
      totalProductsToBill();
      emptyCart();
      const inputName = document.getElementById('customerName');
      const e = {
        target: inputName
      };
      handleInputChange(e,true);
    }else{
      setInputNameError('Nombre del cliente es requerido')
    }
  }

  return (
    <>
      <div className='waiter-order-container'>
        <p>Resumen del pedido</p>
        <input
          id = 'customerName'
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
          <button 
            className='btn btn-danger m-2' 
            onClick={() => emptyCart()}
          >Cancelar</button>
          <button
            type='button'
            className='btn btn-warning m-2'
            onClick={() =>nameValidation()}
          >Ordenar</button>
        </div>
      </div>
    </>
  );
};
