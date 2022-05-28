// IMPORTACION HOOKS Y OTROS
import { Link, Outlet} from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LogOut } from '../../components/shared/LogOut.js';
import logoLaBurger from '../../assets/images/laBurgLogo.png';

// COMPONENTE WAITER CON B. DE NAVEGACION PARA MESERO
export const Waiter = () => {
  console.log('render waiter');
  return (
    <>
      <Navbar expand='sm' className='waiter-nav'>
        <Container>
          <Navbar.Brand>
            <img
              alt='logo-la-burger'
              src={logoLaBurger}
              width='150'
              height='70'
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='waiter-nav-toggle'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto waiter-nav-dir'>
              <Link to='/waiter'>Nuevo Pedido</Link>
              <Link to='/waiter/orders'>Pedidos</Link>
              <Link to='/waiter/delivered-orders'>Pedidos Entregados</Link>
              <LogOut/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className = 'waiter-selected-component'>
        <Outlet/>
      </section>
    </>
  );
};
