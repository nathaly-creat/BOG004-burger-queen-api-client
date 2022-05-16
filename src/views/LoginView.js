// IMPORTACION DE COMPONENTE LOGIN
import { Login } from '../components/Login.js';
import '../styles/loginView.css'

// CONTENEDOR DE LOGIN
export const LoginView = () => {
  return (
    // <> </> Fragment manera de retornar varios elementos
    <>
      <div className='loginView'>
        <Login/>
      </div>
    </>
  )
}
