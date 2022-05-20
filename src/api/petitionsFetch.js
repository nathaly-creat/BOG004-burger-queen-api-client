// IMPORTACION DE FETCH
import fetch from 'node-fetch';
let UrlBase = 'http://localhost:8080/';

// FUNCION DE PETICION PARA LOGIN USER
export const loginFetch = (loginObj) => {
  let Url = UrlBase + 'login';
  return fetch(
    Url, 
    {
      method: 'POST',
      body: JSON.stringify(loginObj),
      headers: {'content-type': 'application/json'}
    }
  )
  .then((response) => {
    if(!response.ok){
      throw Error('Confirmar email y contraseña');
    }
    return response.json();
  })
};

// FUNCION PARA GUARDAR USUARIO LOGUEADO EN SESSIONSTORAGE
export const saveLoginUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
}

// FUNCION DE PETICION PRODUCTOS
export const productFetch = (token) => {
  let Url = UrlBase + 'products';
  return fetch(
    Url, 
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer '+ token, 
      }
    }
  )
  .then((response) => {
    if(!response.ok){
      throw Error('Error al traer productos');
    }
    return response.json();
  })
};
