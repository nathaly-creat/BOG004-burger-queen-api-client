// IMPORTACION CUSTOM HOOK Y FUNCION loginFetch
import { useNavigate } from "react-router-dom";
import { useFormCustHook } from "../hooks/useFormCustHook.js";
import { loginFetch, saveLoginUser } from "../api/petitionsFetch.js";
import { useForm } from "react-hook-form";
import { ModalError } from "./ModalError.js";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  // const loginError = (error) => {
  //   if (!error?.response || error?.response?.status === 400) {
  //     alert("Por favor verifica los datos de acceso");
  //   } else if (error.response.status === 500) {
  //     alert("Error de conexión con el servidor");
  //   } else if (error.response.status === 401) {
  //     alert("Usuario no Autorizado");
  //   } else {
  //     alert("Error de login");
  //   }
  // }
  

  const loginError = () => {
    
    return <ModalError error={true} />
  };

  // funcion para envio de formulario login
  const handleSubmitLogin = (e) => {
    // e.preventDefault();
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
        loginError(error);

        console.log("error L72", error);
      });
  };

  // retorno de estructura de form login
  return (
    <>
      <form className="login" onSubmit={handleSubmit(handleSubmitLogin)}>
        <h2>LABURGUER</h2>
        <input
          type="text"
          name="email"
          placeholder="ejemplo@email.com"
          autoComplete="off"
          value={email}
          {...register("email", {
            required: {
              value: true,
              message: "Necesitas este campo",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "El formato no es correcto",
            },
          })}
          onChange={handleInputChange}
        ></input>
        {errors.email && <span className='spanCss'>{errors.email.message}</span>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          {...register("password", {
            required: {
              value: true,
              message: "El campo es requerido"
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres"
            }
          })}
          onChange={handleInputChange}
        ></input>
        {errors.password && <span className='spanCss'>{errors.password.message}</span>}

        <button type="submit" className="login-btn">
          Iniciar sesión
        </button>

        <ModalError error={false} />
        {/* <div className="errado"></div> */}

      </form>
    </>
  );
};
