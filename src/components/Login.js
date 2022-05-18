// IMPORTACION CUSTOM HOOK Y FUNCION loginFetch
import { useNavigate } from "react-router-dom";
import { useFormCustHook } from "../hooks/useFormCustHook.js";
import { loginFetch, saveLoginUser } from "../api/petitionsFetch.js";

// import { ModalError } from './ModalError.js';

const handleLoginFetch = (user) =>
  new Promise((resolve) => {
    loginFetch(user)
      .then((response) => {
        console.log("token", response);
        // console.log('tipo de respuesta', typeof response);
        typeof response === "string"
          ? resolve("no ingreso")
          : resolve(saveLoginUser(response));
      })
      .catch((error) => {
        console.log("error L15", error);
      });
  });

// COMPONENTE LOGIN
export const Login = () => {
  // estructura de hook para cambio en inputs de form login
  const [formLoginValues, handleInputChange] = useFormCustHook({
    email: "",
    password: "",
  });

  // desestructuracion de formLoginValues
  const { email, password } = formLoginValues;

  // declaracion de navigate para cambio de ruta
  const navigate = useNavigate();

  // función de cambio de ruta
  const handleLoginUrlChange = (rol) => {
    console.log("rol", rol);
    console.log(Object.keys(rol));
    // navigate('/Kitchen');
    navigate(`/${Object.keys(rol)}`, { replace: true });
  };

  const loginError = (error) => {
    if (!error?.response || error?.response?.status === 400) {
      alert("Por favor verifica los datos de acceso");
    } else if (error.response.status === 500) {
      alert("Error en el servidor");
    } else if (error.response.status === 401) {
      alert("Usuario no Autorizado");
    } else {
      alert("Error de login");
    }
  };

  // funcion para envio de formulario login
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    handleLoginFetch(formLoginValues)
      .then(() => {
        console.log("session activa", sessionStorage);
        const activeUser = JSON.parse(sessionStorage.user);
        const userRol = activeUser.user.roles;
        if (activeUser.length !== 0) {
          handleLoginUrlChange(userRol);
        }
      })
      .catch((error) => {
        loginError();
        // console.log('error L52', error);
      });
  };

  // retorno de estructura de form login
  return (
    <>
      <div className="prueba"></div>
      <form className="login" onSubmit={handleSubmitLogin}>
        <h2>LABURGUER</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        ></input>

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleInputChange}
        ></input>

        <button type="submit" className="login-btn">
          Iniciar sesión
        </button>
      </form>
    </>
  );
};
