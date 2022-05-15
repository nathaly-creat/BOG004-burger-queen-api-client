// IMPORTACION DE COMPONENTE LOGIN
import { Login } from '../components/login.js';
import '../styles/loginContainer.css'

// CONTENEDOR DE LOGIN
export const LoginContainer = () => {
    return (
        // <> </> Fragment manera de retornar varios elementos
        <>
            <div className='loginContainer'>
                <Login/>
            </div>
        </>
    )
}
