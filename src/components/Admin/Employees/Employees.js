// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { usersFetch } from '../../../api/petitionsFetch.js';
import { AddEmployee } from './AddEmployee.js';
import { EmployeeList } from './EmployeeList.js';

// COMPONENTE COLABORADOR
export const Employees = () => {

  // extraccion de token usuario activo
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  // estructura de hook para declarar lista de usuarios
  const [users, setUsers] = useState([]);

  // estructura de hook para peticion de usuarios y agregarlos a users
  useEffect(() => {
    usersFetch(activeSessionToken)
      .then((response) => {
        // console.log(response);
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeSessionToken, setUsers]);

  return (
    <>
      <AddEmployee/>
      <EmployeeList users={users}/>
    </>
  );
};
