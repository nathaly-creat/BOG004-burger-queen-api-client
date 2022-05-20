// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { ProductList }  from './ProductList.js';
import { productFetch } from '../../api/petitionsFetch.js'; 

// COMPONENTE MESEROS
export const Waiter = () => {

  // estructura de hook para deteccion de cambio de products
  const [products, setProducts] = useState([]);

  // estructura de hook para peticion de productos y agregar los mismos a el estado de cambio 
  useEffect(() => {
    const activeSession = JSON.parse(sessionStorage.user);
    const activeSessionToken = activeSession.accessToken;
    productFetch(activeSessionToken)
      .then((response) => {
        setProducts(response);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[]);

  return (
    <>
      <p>VISTA DE MESEROS....</p>
      <ProductList products={products}/>
    </>
  )
}
