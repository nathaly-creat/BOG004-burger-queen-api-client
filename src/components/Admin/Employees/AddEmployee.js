// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { createUserPetition } from '../../../api/petitionsFetch.js';

// COMPONENTE PARA REGISTRAR EMPLEADO
export const AddEmployee = ({ token }) => {

  // objeto para pintar valores en select
  const rolesValues = [
    {
      name: 'admin',
    },
    {
      name: 'kitchen',
    },
    {
      name: 'waiter',
    },
  ];

  // estructura de hook para cambio en inputs y select option
  const [selectedInfo, setSelectedInfo] = useState({
    email: '',
    password: '',
    rol: '',
  });

  // desestructuracion de selectedInfo
  const { email, password, rol } = selectedInfo;

  // funcion para manejo de cambio de inputs y select option
  const handleSelectRol = ({ target }) => {
    setSelectedInfo({
      ...selectedInfo,
      [target.id]: target.value,
    });
  };

  // funcion para crear objeto de peticion createUserPetition
  const objCreation = (objValues) => {
    let selectedRol;
    switch (rol) {
      case 'admin':
        selectedRol = { admin: true };
        break;
      case 'kitchen':
        selectedRol = { kitchen: true };
        break;
      case 'waiter':
        selectedRol = { waiter: true };
        break;
      default:
        selectedRol = { waiter: true };
        break;
    }

    return {
      email: objValues.email,
      password: objValues.password,
      roles: selectedRol,
    };
  };

  // se declara el estado de la creacion de usuario
  const [userSuccess, setUserSuccess] = useState('');

  // funcion para validar creación de usuario satisfactorio
  const createUser = () => {
    createUserPetition(token, objCreation(selectedInfo))
      .then(()=>{
        setUserSuccess('Usuario creado exitosamente')
        setSelectedInfo({
          email: '',
          password: '',
          rol: 'admin'
        });
      }).catch(()=>{
        setUserSuccess('Error al crear usuario');
      })
  };
  
  // hook para cambio de mensaje de userSuccess
  useEffect(() => {
    if (userSuccess !== '') {
      setTimeout(() => {
        setUserSuccess('');
      }, 3000);
    }
  }, [userSuccess]);

  return (
    <div className='employee-register'>
      <h3>Registrar Empleado</h3>
      <label>Correo:</label>
      <input
        type='text'
        id='email'
        placeholder='Ejemplo@email.com'
        value={email}
        onChange={handleSelectRol}
      />
      <label>Contraseña:</label>
      <input
        type='text'
        id='password'
        value={password}
        placeholder='Contraseña'
        onChange={handleSelectRol}
      />
      <label>Rol:</label>
      <select className='employee-register-select' id='rol' value={rol.name} onChange={handleSelectRol}>
        {rolesValues.map((rol) => (
          <option key={rol.name} name='rol' value={rol.name}>
            {rol.name}
          </option>
        ))}
      </select>
      <button
        className='btn btn-info'
        onClick={() => createUser()}
      >Crear usuario</button>
      {userSuccess && (
        <span className='' data-testid='user-success-notification'>
          {userSuccess}
        </span>
      )}
    </div>
  );
};
