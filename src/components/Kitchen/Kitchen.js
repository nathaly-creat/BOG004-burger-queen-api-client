// IMPORTACION HOOKS Y OTROS
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LogOut } from '../../components/shared/LogOut.js';
import logoLaBurger from '../../assets/images/laBurgLogo.png';

// COMPONENTE COCINA CON B. DE NAVEGACION PARA COCINA
export const Kitchen = () => {
  return (
    <>
      <Navbar expand='sm' className='general-nav'>
        <img
          alt='logo-la-burger'
          src={logoLaBurger}
          className='general-nav-img'
        />
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className='general-nav-toggle'
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='general-nav-dir'>
            <Link to='/kitchen'>Ordenes</Link>
            <Link
              to='/kitchen/delivered-orders'
              data-testid='nav-kitchen-delivered-orders'
            >
              Pedidos Entregados
            </Link>
            <LogOut/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <section className='general-selected-component'>
        <Outlet/>
      </section>
    </>
  );
};
