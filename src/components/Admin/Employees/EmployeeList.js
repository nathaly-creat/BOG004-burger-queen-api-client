// COMPONENTE LISTA COLABORADORES
export const EmployeeList = ({ users }) => {
  const usersToPrint = users.map((user) => {
    return (
      <section className='waiter-card' key={user.id.toString()}>
        <div className='waiter-card-body'>
          <p><strong>{user.id}</strong></p>
          <p><strong>{user.email}</strong></p>
          <p><strong>{Object.keys(user.roles)[0]}</strong></p>
        </div>
      </section>
    );
  });

  return <div>{usersToPrint}</div>;
};

{
  /* <button className='waiter-add-btn' 
onClick={() => addItem(product)}
>Agregar</button> */
}
