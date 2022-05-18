// FUNCION PARA MOSTRAR MODAL DE ERROR EN LOGIN
export const ModalError = (props) => {
  const error = props.error;
  if(error){
    return (
      <>
        <p>No tienes acceso a esta ruta</p>   
      </>
    );

  }
}


// const root = ReactDOM.createRoot(document.getElementById('root')); 
// // Try changing to isLoggedIn={true}:
// root.render(<Greeting isLoggedIn={false} />);