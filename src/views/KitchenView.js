// IMPORTACION DE COMPONENTE KITCHEN
import { Kitchen } from '../components/Kitchen/Kitchen.js';
import '../styles/kitchenView.css';

// CONTENEDOR DE COCINA
export const KitchenView = () => {
  return (
    <>
      <div className='kitchen-view'>
        <Kitchen/>
      </div>
    </>
  )
}
