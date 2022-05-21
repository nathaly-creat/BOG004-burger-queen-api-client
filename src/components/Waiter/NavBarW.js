// IMPORTACION HOOKS Y OTROS
import { Navbar, Container, Nav } from 'react-bootstrap';
import logoLaBurger from '../../assets/images/laBurgLogo.png';

// COMPONENTE B. NAVEGACION PARA MESERO
export const NavBarW = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='sm'>
        <Container>
          <Navbar.Brand href='#home'>
            <img
              alt='logo-la-burger'
              src={logoLaBurger}
              width='120'
              height='50'
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='toggle'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto waiter-nav-mobile'>
              <Nav.Link href='#home'>Nuevo Pedido</Nav.Link>
              <Nav.Link href='#features'>Pedidos</Nav.Link>
              <Nav.Link href='#pricing'>Pedidos Entregados</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
