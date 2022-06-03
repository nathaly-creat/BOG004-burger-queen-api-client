import { rest } from "msw";
import { setupServer } from "msw/node";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginView } from "../../views/LoginView";

const server = setupServer(
  rest.post("http://localhost:8080/login", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: "tokenLogin",
        user: {
          email: "mesero.hopper@systers.xyz",
          roles: {
            waiter: true,
          },
          id: 3,
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test caso positivo de Login.
test("Route Navigate", async () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <LoginView />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText("ejemplo@email.com");
  const pswInput = screen.getByPlaceholderText("Contraseña");
  const button = screen.getByText("Inicializar");
  fireEvent.change(emailInput, {
    target: { value: "mesero.hopper@systers.xyz" },
  });
  fireEvent.change(pswInput, { target: { value: "123456" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(history.location.pathname).toBe("/waiter");
  });
});

test("handle errors", async () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));
  const fail = setupServer(
    rest.post("http://localhost:8080/login", (_req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.ok(false),
        ctx.json({ error: "Confirmar email y contraseña" })
      );
    })
  );

  // console.log("serverTEstError", fail);

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <LoginView />
    </Router>
  );
  let msgError;
  const emailInput = screen.getByPlaceholderText("ejemplo@email.com");
  const pswInput = screen.getByPlaceholderText("Contraseña");
  const button = screen.getByText("Inicializar");
  fireEvent.change(emailInput, { target: { value: "ejemplo@email.com" } });
  fireEvent.change(pswInput, { target: { value: "1234567" } });
  fireEvent.click(button);

  msgError = await screen.findByTestId("login-error-message");

  expect(msgError.textContent).toBe("Network request failed");
  expect(history.location.pathname).toBe("/");
});
