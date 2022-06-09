// IMPORTACION HOOKS
import { useNavigate } from 'react-router-dom';

// COMPONENTE PARA INDICAR QUE NO TIENE ACCESO Y RETORNAR A VISTA ANTERIOR
export const WithoutAccess = () => {
  const navigate = useNavigate();
  return (
    <div data-testid='without-access'>
      <p> Vista no existente o no tienes acceso permitido</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >Volver</button>
    </div>
  )
}
