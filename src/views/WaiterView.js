// IMPORTACION DE COMPONENTE WAITER
import { Waiter } from '../components/Waiter/Waiter.js';
import '../styles/waiterView.css';

// CONTENEDOR DE MESEROS
export const WaiterView = () => {
  return (
    <>
        <div className='waiter-view'>
          <Waiter />
        </div>
    </>
  );
};
