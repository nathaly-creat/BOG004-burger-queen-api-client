// IMPORTACION HOOKS
import { useNavigate } from 'react-router-dom';
import notFound from '../../assets/images/not-found.jpg'

// COMPONENTE PARA INDICAR QUE NO TIENE ACCESO Y RETORNAR A VISTA ANTERIOR
export const WithoutAccess = () => {
  const navigate = useNavigate();
  return (
    <div className='without-access' data-testid='without-access'>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >Volver</button>
      <p>Vista no existente o no tienes acceso permitido</p>
      <img src={notFound} alt='not-found'/>
    </div>
  )
}
