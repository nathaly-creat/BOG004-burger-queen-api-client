import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { LoginView } from '../../views/LoginView';

// mock de servidor para peticiones de productos
const server = setupServer(
  rest.post('http://localhost:8080/login', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: 'tokenLogin',
        user: {
          email: 'mesero.hopper@systers.xyz',
          roles: {
            waiter: true,
          },
          id: 3,
        },
      })
    );
  })
);

// limpieza mock de servidor
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test caso positivo de login
test('login in waiter page', async () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <LoginView />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText('ejemplo@email.com');
  const pswInput = screen.getByPlaceholderText('Contraseña');
  const button = screen.getByText('Inicializar');

  fireEvent.change(emailInput, { target: { value: 'mesero.hopper@systers.xyz' } });
  fireEvent.change(pswInput, { target: { value: '123456' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(history.location.pathname).toBe('/waiter');
  });
});

// test caso negativo de login
test('login error', async () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  server.use(
    rest.post('http://localhost:8080/login', (_req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Confirmar email y contraseña' })
      );
    })
  );

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <LoginView />
    </Router>
  );

  let msgError;
  const emailInput = screen.getByPlaceholderText('ejemplo@email.com');
  const pswInput = screen.getByPlaceholderText('Contraseña');
  const button = screen.getByText('Inicializar');
  fireEvent.change(emailInput, { target: { value: 'ejemplo@email.com' } });
  fireEvent.change(pswInput, { target: { value: '1234567' } });
  fireEvent.click(button);

  msgError = await screen.findByTestId('login-error-message');

  expect(msgError.textContent).toBe('Confirmar email y contraseña');
  expect(history.location.pathname).toBe('/');
});
