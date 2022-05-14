import fetch from 'node-fetch';
let UrlBase = 'http://localhost:8080/';

export const LoginFetch = (loginObj) => new Promise ((resolve, reject) => {
    let Url = UrlBase + 'login'; 
    fetch(
        Url, 
        {
            method: 'POST',
            body: JSON.stringify(loginObj),
            headers: {'Content-Type': 'application/json'}
        }
    )
    .then(response => resolve(response.json()))
    .catch(error => {
        reject(error);
    });
});
