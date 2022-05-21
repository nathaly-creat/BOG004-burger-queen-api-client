// IMPORTACION DE COMPONENTE LOGIN
import { Login } from '../components/Login/Login.js';
import '../styles/loginView.css'
import picBurg from '../assets/images/picBurg.png';

// CONTENEDOR DE LOGIN
export const LoginView = () => {
  return (
    // <> </> Fragment manera de retornar varios elementos
    <>
      <div className='login-view'>
        <div className='login-pic'>
          <img src={ picBurg } alt='burger-pic' />
        </div>
        <Login/>
      </div>
    </>
  )
}
