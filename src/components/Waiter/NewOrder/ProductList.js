// IMPORTACION HOOKS Y OTROS
import { Accordion } from 'react-bootstrap';
import { useCart } from 'react-use-cart';

// COMPONENTE PARA MOSTRAR PRODUCTOS
export const ProductList = ({products}) => {

  // funcion para agregar items al carrito
  const { addItem } = useCart();

  // funcion para pintar los productos segun categoria
  const printProduct = (typeToPrint) => {
    return products.map((product) => {
      let prodToPrint;
      if (product.type === typeToPrint) {
        prodToPrint = (
          <section className='waiter-card' key={product.id.toString()}>
              <figure>
                <img src={product.image} alt='products'/>
              </figure>
              <div className='waiter-card-body'>
                <p><strong>{product.name}</strong></p>
                <p><strong>${product.price}</strong></p>
                <button className='waiter-add-btn' 
                  onClick={() => addItem(product)}
                >Agregar</button>
              </div>
          </section>
        );
      }
      return prodToPrint;
    });
  }

  return (
    <>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item className='waiter-accordion' eventKey='0'>
          <Accordion.Header className='waiter-accordion-header'>DESAYUNOS</Accordion.Header>
          <Accordion.Body className='waiter-accordion-body'>
            <div className='waiter-accordion-product'>{printProduct('Desayuno')}</div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className='waiter-accordion' eventKey='1'>
          <Accordion.Header className='waiter-accordion-header'>ALMUERZOS</Accordion.Header>
          <Accordion.Body className='waiter-accordion-body'>
            <div className='waiter-accordion-product'>{printProduct('Almuerzo')}</div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
