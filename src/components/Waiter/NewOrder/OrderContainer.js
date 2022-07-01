// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import {
  onlyProductPetition,
  orderPetition,
} from '../../../api/petitionsFetch.js';
import { ProductsToBill } from './ProductsToBill.js';

// COMPONENTE PARA MOSTRAR ORDEN DE CLIENTE
export const OrderContainer = ({ activeSession }) => {
  // estructura de hook para cambio en input de nombre cliente
  const [inputNameCus, setInputNameCust] = useState({
    customerName: '',
  });

  // desestructuracion de inputNameCus
  const { customerName } = inputNameCus;

  // funcion para manejo de cambio de input
  const handleInputChangeOrder = ({ target }) => {
    setInputNameCust({
      ...inputNameCus,
      [target.name]: target.value,
    });
  };

  // se declaran los metodos para actualizacion de productos a ordenar
  const { cartTotal, emptyCart } = useCart();

  // se declara el estado de la orden
  const [orderSuccess, setOrderSuccess] = useState('');

  // hook para cambio para mensaje de orderSuccess
  useEffect(() => {
    if (orderSuccess !== '') {
      setTimeout(() => {
        setOrderSuccess('');
      }, 2000);
    }
  }, [orderSuccess]);

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
      onlyProductPetition(token, product.id)
        .then((response) => {
          products.push({ qty: product.quantity, product: response });
          const orderPetitionObj = {
            userId: userId,
            client: customerName,
            products: products,
            status: 'pending',
            dateEntry: new Date().toLocaleString('sv'),
            totalPrice: cartTotal,
          };
          if (products.length === total.length) {
            orderPetition(token, orderPetitionObj)
              .then(() => {
                setOrderSuccess('Orden creada con éxito');
              })
              .catch((error) => {
                console.log('Error de Orden', error);
              });
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
    if (customerName !== '') {
      totalProductsToBill();
      emptyCart();
      setInputNameCust({ customerName: '' });
    } else {
      setInputNameError('Nombre del cliente es requerido');
    }
  };

  return (
    <>
      <div className='waiter-order-container'>
        <h3>Resumen del pedido</h3>
        <input
          id='customerName'
          type='text'
          name='customerName'
          placeholder='Nombre del cliente'
          autoComplete='off'
          value={customerName}
          onChange={handleInputChangeOrder}
          className='waiter-order-container-input'
        ></input>
        <span>{inputNameError}</span>
        <ProductsToBill/>
        <h2>Total: $ {cartTotal}</h2>
        <div>
          <button className='btn btn-secondary m-2' onClick={() => emptyCart()}>
            Cancelar
          </button>
          <button
            type='button'
            className='btn btn-order-request m-2'
            id='btn-order'
            onClick={() => nameValidation()}
          >
            Ordenar
          </button>
        </div>
        {orderSuccess && (
          <span data-testid='order-success-notification'>
            {orderSuccess}
          </span>
        )}
      </div>
    </>
  );
};
