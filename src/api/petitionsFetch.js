// IMPORTACION DE FETCH
import fetch from 'node-fetch';
let UrlBase = 'http://localhost:8080/';

// PETICION PARA LOGIN USER
export const loginFetch = (loginObj) => new Promise ((resolve, reject) => {
    let Url = UrlBase + 'login'; 
    fetch(
        Url, 
        {
            method: 'POST',
            body: JSON.stringify(loginObj),
            headers: {'Content-Type': 'application/json'}
        }
    )
    .then((response) => {
        resolve(response.json())
    })
    .catch((error) => {
        reject(error);
    });
});

//Funcion para guardar usuario en localstorage.
export const saveLoginUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}

