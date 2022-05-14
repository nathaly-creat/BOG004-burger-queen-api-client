import React from 'react';
import { Login } from '../components/login.js';
import '../styles/login-container.css'

export const LoginContainer = () => {
    return (
        <>
            <div className='loginContainer'>
                <Login/>
            </div>
        </>
    )
}
