import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen } from "@testing-library/react";
import { Employees} from "../../../../components/Admin/Employees/Employees.js";
import {
  usersPetition
} from "../../../../api/petitionsFetch.js";

// mock de sessionStorage para token
sessionStorage.user = JSON.stringify({
  accessToken: "tokenfortestKitchen",
  user: {
    email: "grace.hopper@systers.xyz",
    roles: {
      admin: true,
    },
    id: 2,
  },
});

// mock de servidor peticiones de usuarios | creacion
const server = setupServer(
  rest.get("http://localhost:8080/users", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          email: "grace.hopper@systers.xyz",
          password:
            "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
          roles: {
            admin: true,
          },
          id: 2,
        }
      ])
    );
  }),
  rest.post("http://localhost:8080/users", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          email: "test.hopper@systers.xyz",
          password:
            "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
          roles: {
            waiter: true,
          },
          id: 3,
        }
      ])
    );
  }),
);

// limpieza mock de servidor
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test para peticion de usuarios
test("response of usersPetition", async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let usersList = [
    {
      email: "grace.hopper@systers.xyz",
      password: "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
      roles: {
        admin: true,
      },
      id: 2,
    }
  ];

  const usersTestResult = await usersPetition(activeSessionToken);
  expect(usersTestResult).toEqual(usersList);
});

// test para visualizar los usuarios
test("print of users in Employees component", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Employees/>
    </Router>
  );

  const usersInComponent = await screen.findByTestId('employee-id');
  expect(usersInComponent.textContent).toEqual('id: 2.');
});

// evento de boton de creacion de usuario exitoso
test('create user event', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Employees />
    </Router>
  );

  const createUserButton = screen.getByText('Crear usuario');
  fireEvent.click(createUserButton);

  const userSuccess = await screen.findByTestId('user-success-notification');
  expect(userSuccess.textContent).toBe('Usuario creado exitosamente');
});
