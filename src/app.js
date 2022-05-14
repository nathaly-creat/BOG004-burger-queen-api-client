import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginContainer } from './views/login-container.js';
import { Kitchen } from './components/kitchen.js';

export default function App() {
  return (
      <Routes>
        <Route path='/' element={<LoginContainer/>} />
        <Route path='/kitchen' element={<Kitchen/>} />
      </Routes>
  );
};
