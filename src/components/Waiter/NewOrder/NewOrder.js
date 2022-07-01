// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { CartProvider } from 'react-use-cart';
import { productPetition } from '../../../api/petitionsFetch.js';
import { ProductList } from './ProductList.js';
import { OrderContainer } from './OrderContainer.js';

// COMPONENTE PARA MOSTRAR PRODUCTOS Y RESUMEN DE PRODUCTOS A ORDENAR
export const NewOrder = () => {

  // extraccion de token usuario activo
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  // estructura de hook para declarar lista de productos
  const [products, setProducts] = useState([]);

  // estructura de hook para peticion de productos y agregar
  // los mismos a la lista de productos (products)
  useEffect(() => {
    productPetition(activeSessionToken)
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeSessionToken, setProducts]);

  return (
    <>
      <CartProvider>
        <ProductList products={products} />
        <OrderContainer activeSession={activeSession} />
      </CartProvider>
    </>
  );
};
