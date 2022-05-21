// IMPORTACION HOOKS Y OTROS
import { Accordion } from 'react-bootstrap';

// COMPONENTE PARA MOSTRAR PRODUCTOS
export const ProductList = (props) => {
  console.log('props', props);

  // declaracion de lista de productos
  const products = props.products;

  // captura de productos de desayuno
  let breakfastProd = products.map((product) => {
    let breakfast;
    if (product.type === 'Desayuno') {
      breakfast = (  
          <li key={product.id.toString()}>
            <img src={product.image} alt='products' />
            {product.name}
            {product.price}
          <button className='waiter-add-btn'>Agregar</button>
          </li>
      );
    }
    return breakfast;
  });

  // captura de productos de almuerzo
  let lunchProd = products.map((product) => {
    let lunch;
    if (product.type === 'Almuerzo') {
      lunch = (
        <li key={product.id.toString()}>
          <img src={product.image} alt='products' />
          {product.name}
          {product.price}
          <button className='waiter-add-btn'>Agregar</button>
        </li>
      );
    }
    return lunch;
  });

  return (
    <>
      <Accordion  defaultActiveKey={['0']} alwaysOpen >
        <Accordion.Item className='waiter-accordion' eventKey='0' >
          <Accordion.Header>DESAYUNOS</Accordion.Header>
          <Accordion.Body>
            <ul>{breakfastProd}</ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className='waiter-accordion' eventKey='1'>
          <Accordion.Header>ALMUERZOS</Accordion.Header>
          <Accordion.Body>
            <ul>{lunchProd}</ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
