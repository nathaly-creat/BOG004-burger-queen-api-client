// FUNCION PARA MOSTRAR MODAL DE ERROR EN LOGIN
export const ModalError = (error) => {
  return (
    <div className='modal-error'>
      <p>{ error }</p>
    </div>
  );
}