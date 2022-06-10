// IMPORTACION HOOKS Y OTROS
import { useState } from 'react';
import { useFormCustHook } from '../../../hooks/useFormCustHook.js';
import { createUserFetch } from '../../../api/petitionsFetch.js';

// COMPONENTE PARA REGISTRAR EMPLEADO
export const AddEmployee = ({ token }) => {

  // estructura de hook para cambio en inputs de form login
  const [formRecordValues, handleInputChange] = useFormCustHook({
    email: '',
    password: '',
  });

  // desestructuracion de formRecordValues
  const { email, password } = formRecordValues;

  // objeto para pintar valores en select
  const rolesValues = [
    {
      name: 'admin',
    },
    {
      name: 'waiter',
    },
    {
      name: 'kitchen',
    },
  ];

  // estructura de hook para cambio en select option
  const [selectedRol, setSelectedRol] = useState({
    rol: '',
  });

  // desestructuracion de selectedRol
  const { rol } = selectedRol;

  // funcion para manejo de cambio de select
  const handleSelectRol = ({ target }) => {
    setSelectedRol({
      ...selectedRol,
      [target.id]: target.value,
    });
  };

  // funcion para crear objeto de peticion createUserFetch
  const objCreation = (formRecordValues) => {
    let selectedRol;
    switch (rol) {
      case 'admin':
        selectedRol = { admin: true };
        break;
      case 'waiter':
        selectedRol = { waiter: true };
        break;
      case 'kitchen':
        selectedRol = { kitchen: true };
        break;
      default:
        break;
    }

    return {
      email: formRecordValues.email,
      password: formRecordValues.password,
      roles:  selectedRol,
    };
  };

  return (
    <div className='employee-register' >
      <h1>Registrar Empleado</h1>
      <label>Correo:</label>
      <input
        type='text'
        name='email'
        placeholder='ejemplo@email.com'
        value={email}
        onChange={handleInputChange}
      />
      <label>Contraseña:</label>
      <input
        type='text'
        name='password'
        value={password}
        placeholder='Contraseña'
        onChange={handleInputChange}
      />
      <label>Rol:</label>
      <select id='rol' value={rol.name} onChange={handleSelectRol}>
        {rolesValues.map((rol) => (
          <option key={rol.name} name='rol' value={rol.name}>
            {rol.name}
          </option>
        ))}
      </select>
      <button
        className='btn btn-info'
        onClick={() => createUserFetch(token, objCreation(formRecordValues))}
      >crear usuario</button>
    </div>
  );
};
