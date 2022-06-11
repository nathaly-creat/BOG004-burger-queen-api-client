// IMPORTACION HOOKS Y OTROS
import { Link, Outlet} from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LogOut } from '../../components/shared/LogOut.js';
import logoLaBurger from '../../assets/images/laBurgLogo.png';


// COMPONENTE ADMIN CON B. DE NAVEGACION PARA ADMINISTRADOR.
export const Admin = () => {
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
              <Link to='/admin'>Colaboradores</Link>
              <Link to='/admin/delivered-orders' data-testid='nav-kitchen-delivered-orders'>Pedidos Entregados</Link>
              <LogOut/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className='general-selected-component'>
        <Outlet/>
      </section>
    </>
  )
}
