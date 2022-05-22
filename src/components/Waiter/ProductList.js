// IMPORTACION HOOKS Y OTROS
import { Accordion } from "react-bootstrap";

// COMPONENTE PARA MOSTRAR PRODUCTOS
export const ProductList = (props) => {
  console.log("props", props);

  // declaracion de lista de productos
  const products = props.products;

  // captura de productos de desayuno
  let breakfastProd = products.map((product) => {
    let breakfast;
    if (product.type === "Desayuno") {
      breakfast = (
        <div className="card mb-3" key={product.id.toString()}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={product.image} className="img-fluid rounded-start" alt="products" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  <strong>{product.price}</strong>                
                </p>
                <button className='waiter-add-btn'>Agregar</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return breakfast;
  });

  // captura de productos de almuerzo
  let lunchProd = products.map((product) => {
    let lunch;
    if (product.type === "Almuerzo") {
      lunch = (
        <div className="card mb-3" key={product.id.toString()}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={product.image} className="img-fluid rounded-start" alt="products" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Precio: $ {product.price}</p>
                <button className='waiter-add-btn'>Agregar</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return lunch;
  });

  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item className="waiter-accordion" eventKey="0">
          <Accordion.Header className="accordion-header">DESAYUNOS</Accordion.Header>
          <Accordion.Body className="accordion-body">
            <div className="product">{breakfastProd}</div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="waiter-accordion" eventKey="1">
          <Accordion.Header>ALMUERZOS</Accordion.Header>
          <Accordion.Body>
            <div className="product">{lunchProd}</div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="container-order">
        prueba
      </div>
      
    </>
    
  );
};
