// IMPORTACION HOOKS Y OTROS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFormCustHook } from '../../hooks/useFormCustHook.js';
import { loginFetch, saveLoginUser } from '../../api/petitionsFetch.js';
import logoLaBurger from '../../assets/images/laBurgLogo.png';

// FUNCION PARA RESOLVER loginFetch
const handleLoginFetch = (user) => new Promise((resolve, reject) => {
  loginFetch(user)
    .then((response) => {
      resolve(saveLoginUser(response));
    })
    .catch((error) => {
      reject(error);
    });
});

// COMPONENTE LOGIN
export const Login = () => {

  // estructura de hook para validaciones de formulario 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  const handleLoginUrlChange = (role) => {
    console.log('rol', role);
    return navigate(`/${Object.keys(role)}`, { replace: true });
  };

  // estructura de hook para mostrar error de login
  const [loginError, setLoginError] = useState(null);

  // funcion para envio de formulario login
  const handleSubmitLogin = () => {
    return handleLoginFetch(formLoginValues)
      .then(() => {
        const activeUser = JSON.parse(sessionStorage.user);
        const userRole = activeUser.user.roles;
        if (activeUser.length !== 0) {
          handleLoginUrlChange(userRole);
        }
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  // retorno de estructura de form login
  return (
    <>
      <form className='login-form' onSubmit={handleSubmit(handleSubmitLogin)}>
        <div className='login-logo'>
          <img src={ logoLaBurger } alt='logo-la-burger'/>
        </div>
        <input
          type='text'
          name='email'
          placeholder='ejemplo@email.com'
          autoComplete='off'
          value={email}
          {...register('email', {
            required: {
              value: true,
              message: 'El campo es requerido',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'El formato no es correcto',
            },
          })}
          onChange={handleInputChange}
        ></input>
        {errors.email && <span className='login-error'>{errors.email.message}</span>}

        <input
          type='password'
          name='password'
          placeholder='Contraseña'
          value={password}
          {...register('password', {
            required: {
              value: true,
              message: 'El campo es requerido'
            },
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres'
            }
          })}
          onChange={handleInputChange}
        ></input>
        {errors.password && <span className='login-error'>{errors.password.message}</span>}

        <button type='submit' className='login-btn'>
          Iniciar sesión
        </button>

        { loginError && <span className='login-error'>{loginError}</span>}

      </form>
    </>
  );
};
