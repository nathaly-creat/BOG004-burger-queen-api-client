// IMPORTACION HOOKS Y OTROS
import { useNavigate } from 'react-router-dom';

// COMPONENTE LOGOUT
export const LogOut = () => {
  
  // declaracion de navigate para cambio de ruta
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          sessionStorage.removeItem('user');
          navigate(`/`, { replace: true });
        }}
      >
        Log Out
      </button>
    </>
  );
};
