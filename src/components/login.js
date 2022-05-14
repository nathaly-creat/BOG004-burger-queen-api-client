import React from 'react';
import { LoginFetch } from '../providers/fetch.js';
// import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


export const Login = () => {
    // const navigate = useNavigate();
    // const handleClick = () => {
    //     history.push('/kitchen')
    // };
    LoginFetch({
        "email": "grace.hopper@systers.xyz",
        "password": "123456"
    })
    .then((response) => {
        console.log('hoooo', response)
    })
    .catch((err) => { 
        console.log(err) 
    });
    return (
        <>
            <form className='login'>
                <label>Usuario</label>
                <input type='text' placeholder='Correo'></input>
                <label>Contraseña</label>
                <input type='text' placeholder='Contraseña'></input>
                <button type='submit'>Iniciar sesión</button>
            </form>
        </>
    )
};
