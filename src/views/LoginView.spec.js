import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginView } from './LoginView';

test('Componente login', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <LoginView />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText('ejemplo@email.com');
  const pswInput = screen.getByPlaceholderText('Contraseña');
  const button = screen.getByText('Inicializar');
  fireEvent.change(emailInput, { target: { value: 'mesero.laburguer@systers.xyz' } });
  fireEvent.change(pswInput, { target: { value: '1234567' } });
  fireEvent.click(button);

  let msgError;
  await waitFor(() => {
    msgError = screen.queryByTestId('login-error-message');
    console.log('prueba', msgError);
    expect(msgError.textContent).toBe('Confirmar email y contraseña');
  });
});
