// IMPORTACION DE COMPONENTE ADMIN
import { Admin } from '../components/Admin/Admin.js';
import '../styles/adminView.css';

// CONTENEDOR DE COCINA
export const AdminView = () => {
  return (
    <>
      <div className='admin-view'>
        <Admin/>
      </div>
    </>
  )
}
