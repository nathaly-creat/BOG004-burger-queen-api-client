// IMPORTACION HOOKS Y OTROS
import { useNavigate } from 'react-router-dom';

// COMPONENTE LOGOUT
export const LogOut = () => {
  
  // declaracion de navigate para cambio de ruta
  const navigate = useNavigate();

  return (
    <>
      <button
        className="btn-logout"
        onClick={() => {
          sessionStorage.removeItem('user');
          localStorage.removeItem('react-use-cart');
          navigate(`/`, { replace: true });
        }}
      ><i className="fa-solid fa-right-from-bracket"></i></button>
    </>
  );
};
