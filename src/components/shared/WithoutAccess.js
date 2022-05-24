// IMPORTACION HOOKS
import { useNavigate } from 'react-router-dom';

// COMPONENTE PARA INDICAR QUE NO TIENE ACCESO Y RETORNAR A VISTA ANTERIOR
export const WithoutAccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <p> Vista no existente o no tienes permitido el acceso</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        volver
      </button>
    </>
  )
}
