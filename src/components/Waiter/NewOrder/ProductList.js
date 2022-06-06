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
          <div className='card mb-3' key={product.id.toString()}>
            <div className='row g-0'>
              <div className='col-md-4'>
                <img src={product.image} className='img-fluid rounded-start' alt='products' />
              </div>
              <div className='col-md-8'>
                <div className='waiter-card-body'>
                  <h5 className='waiter-card-title'>{product.name}</h5>
                  <p className='waiter-card-text'><strong>{product.price}</strong></p>
                  <button className='waiter-add-btn'
                    onClick={() => addItem(product)}
                  >Agregar</button>
                </div>
              </div>
            </div>
          </div>
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
