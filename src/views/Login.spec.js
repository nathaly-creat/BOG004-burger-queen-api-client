import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// import Login from './Login.js'
import { LoginView } from "./LoginView";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

test("Componente login", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <LoginView />
    </Router>
  );
  const emailInput = screen.getByPlaceholderText("ejemplo@email.com");
  const pswInput = screen.getByPlaceholderText("Contraseña");
  fireEvent.change(emailInput, { target: { value: "mesero.laburguer@systers.xyz" } });
  fireEvent.change(pswInput, { target: { value: "123457" } });
  const button = screen.getByText("Iniciar sesion");
  fireEvent.click(button);
  let msgError;
  await waitFor(() => {
    msgError = screen.queryByTestId("login-error-message");
    console.log("prueba", msgError);
    expect(msgError.textContent).toBe("Confirmar email y contraseña");
  });
});
