// IMPORTACION HOOKS Y OTROS
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LogOut } from '../../components/shared/LogOut.js';
import logoLaBurger from '../../assets/images/laBurgLogo.png';

// COMPONENTE B. NAVEGACION PARA MESERO
export const NavBarW = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='sm'>
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
            <Nav className='me-auto'>
              <Nav.Link href='#NewOrder'>Nuevo Pedido</Nav.Link>
              <Nav.Link href='#Orders'>Pedidos</Nav.Link>
              <Nav.Link href='#DeliveredOrders'>Pedidos Entregados</Nav.Link>
              <LogOut/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
