// IMPORTACION CUSTOM HOOK Y FUNCION loginFetch
import { useEffect } from 'react';
import { useFormCustHook } from '../hooks/useFormCustHook.js';
import { loginFetch, saveLoginUser } from '../api/petitionsFetch.js';
import { ModalError } from './ModalError.js';

const handleLoginFetch = (user) => {
  loginFetch(user)
    .then((response) => {
      console.log('token', response);
      saveLoginUser(response);
    })
    .catch((error) => {
      console.log('error', error);
      ModalError('te equivocaste', error);
    });
};

// COMPONENTE LOGIN
export const Login = () => {
  // estructura de hook para cambio en inputs de form login
  const [formLoginValues, handleInputChange] = useFormCustHook({
    email: '',
    password: '',
  });

  // desestructuracion de formLoginValues
  const { email, password } = formLoginValues;

  // funcion para envio de formulario login
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log('L39', formLoginValues);
    handleLoginFetch(formLoginValues);
  };

  // escuchador de cambios para form
  useEffect(() => {
    console.log('cambio de form');
  }, [formLoginValues]);

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
