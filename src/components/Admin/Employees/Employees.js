// IMPORTACION HOOKS Y OTROS
import { useState, useEffect } from 'react';
import { usersPetition } from '../../../api/petitionsFetch.js';
import { AddEmployee } from './AddEmployee.js';
import { EmployeeCard } from './EmployeeCard.js';

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

  // estructura de hook para para visualizar usuarios actualizados cada seg
  useEffect(() => {
    const interval = setInterval(() => {
      getUsers();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='admin-view-components'>
      <AddEmployee token={activeSessionToken}/>
      <section className='admin-view-components-list'>
        <h3>Listado de Colaboradores</h3>
        <section className='employee-list-general'>
          <EmployeeCard users={users} token={activeSessionToken}/>
        </section>
      </section>
    </section>
  );
};
