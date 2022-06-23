import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { LogOut } from "../../components/shared/LogOut.js";
import logoLaBurger from "../../assets/images/laBurgLogo.png";
import { Link } from 'react-router-dom';

export const SideBar = ({ toggled, handleToggleSidebar }) => {
  return (
    <ProSidebar
      toggled={toggled}
      breakPoint="sm"
      onToggle={handleToggleSidebar}
      style={{ height: "100%" }}
    >
      <Menu>
        <img
          alt="logo-la-burger"
          src={logoLaBurger}
          className="d-inline-block align-top general-nav-img"
        />
        <MenuItem>
          <Link to='/waiter'>Nuevo Pedido</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/waiter/orders' data-testid='nav-waiter-orders'>Pedidos</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/waiter/delivered-orders'>Pedidos Entregados</Link>
        </MenuItem>
        <LogOut/>
      </Menu>
    </ProSidebar>
  );
};
