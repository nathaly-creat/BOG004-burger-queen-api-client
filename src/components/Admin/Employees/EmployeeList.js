// IMPORTACION HOOKS Y OTROS
import { useState, useRef } from 'react';
import { deleteUserFetch } from '../../../api/petitionsFetch.js';

// COMPONENTE LISTA COLABORADORES  // value={this.state.value} onChange={this.handleChange}
export const EmployeeList = ({ users, token }) => {

  // hook para manejar el estado de edición de correo de colaborador
  const [editing, setEditing] = useState(false)
  
  // hook para editar correo de colaborador
  const [employeeEmail, setEmployeeEmail] = useState('');

  const editEmail = user => {
    setEditing(true) 
    setEmployeeEmail({ id: user.id, email: user.email})
  }

  const inputs = useRef();

  const editemployeeEmail = (idToChange) => {
    console.log('empleado a editar', idToChange, inputs.current.value);
    inputs.current.readOnly = false;
    users.forEach((input)=>{console.log(input.current.value)})
    // if (textArea.id === buttonEditClicked) {
    //   textArea.removeAttribute('readonly');
    //   btnEdit.classList.add('hidenBtn');
    //   saveButton[index].classList.remove('hidenBtn');
    // }
  }
  
  const usersToPrint = users.map((user) => {
    return (
      <section key={user.id.toString()}>
        <div>
          <p><strong>id:</strong>{user.id}.</p>
          <p><strong>Correo:</strong></p>
          <input 
            type='text'
            defaultValue={user.email}
            readOnly
            id={user.id}
            ref={inputs}
            onChange={(e) => setEmployeeEmail(e.target.value)}
          ></input>
          <p><strong>Rol:</strong>{Object.keys(user.roles)[0]}</p>
          <button
            className='waiter-add-btn' 
            onClick={() => editemployeeEmail(user.id)}>
            <i className='fa-solid fa-pencil'></i>
          </button>
          <button 
            className='waiter-add-btn' 
            onClick={() => deleteUserFetch(user.id, token)}>
            <i className='fa-regular fa-trash-can'></i>
          </button>
        </div>
      </section>
    );
  });
  
  return ( 
    <div>
      {usersToPrint}
    </div>
  );
};
