// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { ProductList }  from './ProductList.js';
import { productFetch } from '../../api/petitionsFetch.js'; 
import { NavBarW } from './NavBarW.js';

// COMPONENTE MESEROS
export const Waiter = () => {
  
  console.log('render waiter');

  // estructura de hook para deteccion de cambio en lista de products
  const [products, setProducts] = useState([]);

  // estructura de hook para peticion de productos y agregar los mismos a la lista del hook L13 
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
  },[setProducts]);

  return (
    <>
      <NavBarW />
      <ProductList products={products}/>
    </>
  )
}
