// IMPORTACION HOOKS Y OTROS
// import { useState, useEffect } from 'react';
import { useFormCustHook } from '../../../hooks/useFormCustHook.js';
import { createUserFetch } from '../../../api/petitionsFetch.js';

// COMPONENTE PARA REGISTRAR EMPLEADO
export const AddEmployee = ({token}) => {
  // estructura de hook para cambio en inputs de form login
  const [formRecordValues, handleInputChange] = useFormCustHook({
    email: '',
    password: '',
    rol: '',
  });

  // desestructuracion de formRecordValues
  const { email, password, rol} = formRecordValues;

  // funcion para crear objeto segun necesidad de peticion
  const objCreation = (formRecordValues) => {
    let selectedRol;
    console.log(formRecordValues.rol);
    switch (formRecordValues.rol) {
      case 'admin':
        selectedRol = {admin : true};
        break;
      case 'waiter':
        selectedRol = {waiter : true};
        break;
      case 'kitchen':
        selectedRol = {kitchen : true};
        break;
      default:
        break;
    }

    return {
      email: formRecordValues.email,
      password: formRecordValues.password,
      roles: selectedRol
    };
  };

  const rolesValues = [
    {
      value: rol,
      name:'admin',
    },
    {
      value: rol,
      name:'waiter',
    },
    {
      value: rol,
      name:'kitchen',
    }
  ];

  return (
    <div className='employee-register'>
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
      <select>
        {rolesValues.map((rol) =>
          <option key={rol.name} name='rol' value={rol.value} onChange={handleInputChange}>{rol.name}</option>)
        }
      </select>
      <button 
        className='btn btn-info'
        onClick={() =>  createUserFetch(token, objCreation(formRecordValues))}
      >crear usuario</button>
    </div>
  );
};

 /* <input 
        type='text'
        name='rol'
        placeholder='Rol'
        value={rol}
        onChange={handleInputChange}
      /> */