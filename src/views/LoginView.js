// IMPORTACION DE COMPONENTE LOGIN
import { Login } from '../components/Login/Login.js';
import '../styles/loginView.css'

// CONTENEDOR DE LOGIN
export const LoginView = () => {
  return (
    <>
      <div className='login-view'>
        <div className='login-bag'>
          <Login/>
        </div>
      </div>
    </>
  )
}
