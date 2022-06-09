// IMPORTACION HOOKS Y OTROS
import { Link, Outlet } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LogOut } from '../../components/shared/LogOut.js';
import logoLaBurger from '../../assets/images/laBurgLogo.png';

// COMPONENTE WAITER CON B. DE NAVEGACION PARA MESERO
export const Waiter = () => {
  return (
    <>
      <Navbar expand='sm' className='general-nav'>
        <Container>
          <Navbar.Brand>
            <img
              alt='logo-la-burger'
              src={logoLaBurger}
              className='d-inline-block align-top general-nav-img'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='general-nav-toggle'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto general-nav-dir'>
              <Link to='/waiter'>Nuevo Pedido</Link>
              <Link to='/waiter/orders' data-testid='nav-waiter-orders'>Pedidos</Link>
              <Link to='/waiter/delivered-orders'>Pedidos Entregados</Link>
              <LogOut/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className='general-selected-component'>
        <Outlet/>
      </section>
    </>
  );
};
