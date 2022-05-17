// IMPORTACION CUSTOM HOOK Y FUNCION loginFetch
import { useNavigate } from 'react-router-dom';
import { useFormCustHook } from '../hooks/useFormCustHook.js';
import { loginFetch, saveLoginUser } from '../api/petitionsFetch.js';
// import { ModalError } from './ModalError.js';

const handleLoginFetch = (user) => new Promise ((resolve) => {
  loginFetch(user)
    .then((response) => {
      // console.log('token', response);
      // console.log('tipo de respuesta', typeof response);
      typeof response === 'string' ? resolve('no ingreso') : resolve(saveLoginUser(response));
    })
    .catch((error) => {
      console.log('error L15', error);
    });
});

// COMPONENTE LOGIN
export const Login = () => {
  // estructura de hook para cambio en inputs de form login
  const [formLoginValues, handleInputChange] = useFormCustHook({
    email: '',
    password: '',
  });

  // desestructuracion de formLoginValues
  const { email, password } = formLoginValues;

  // declaracion de navigate para cambio de ruta
  const navigate = useNavigate();

  // función de cambio de ruta
  const handleLoginUrlChange = (rol) => {
    console.log('rol', rol)
    console.log(Object.keys(rol));
    // navigate('/Kitchen');
    navigate(`/${Object.keys(rol)}`, { replace: true});
  }

  // funcion para envio de formulario login
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    handleLoginFetch(formLoginValues)
      .then(() => {
        console.log('session activa', sessionStorage);
        const activeUser = JSON.parse(sessionStorage.user);
        const userRol = activeUser.user.roles;
        activeUser.length !== 0 ? handleLoginUrlChange(userRol) : console.log('revisa info');
      })
      .catch((error) => {
        console.log('error L52', error);
      });
  };

  // retorno de estructura de form login
  return (
    <>
      <form className='login' onSubmit={handleSubmitLogin}>
        <label>
          Email:
          <input
            type='email'
            name='email'
            placeholder='Correo'
            autoComplete='off'
            value={email}
            onChange={handleInputChange}
          ></input>
        </label>
        <label>
          Contraseña:
          <input
            type='password'
            name='password'
            placeholder='Contraseña'
            value={password}
            onChange={handleInputChange}
          ></input>
        </label>
        <button type='submit' className='login-btn'>
          Iniciar sesión
        </button>
      </form>
    </>
  );
};
