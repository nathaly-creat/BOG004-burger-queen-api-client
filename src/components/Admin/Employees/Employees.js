// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { usersPetition } from '../../../api/petitionsFetch.js';
import { AddEmployee } from './AddEmployee.js';
import { EmployeeList } from './EmployeeList.js';

// COMPONENTE COLABORADOR
export const Employees = () => {
  // extraccion de token 
  const activeSessionToken = JSON.parse(sessionStorage.user).accessToken;

  // estructura de hook para declarar lista de usuarios
  const [users, setUsers] = useState([]);

  // funcion para peticion de usuarios
  const getUsers = async () => {
    usersPetition(activeSessionToken)
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // estructura de hook para visualizar usuarios
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // estructura de hook para para visualizar usuarios actualizados cada 10 seg
  useEffect(() => {
    const interval = setInterval(() => {
      getUsers();
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AddEmployee token={activeSessionToken}/>
      <EmployeeList users={users} token={activeSessionToken} />
    </>
  );
};
