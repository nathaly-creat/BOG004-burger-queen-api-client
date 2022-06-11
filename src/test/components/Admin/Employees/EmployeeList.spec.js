import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import { Employees } from "../../../../components/Admin/Employees/Employees.js";
import {
  deleteUserPetition,
  updateUserPetition,
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

// mock de servidor peticiones | edicion | eliminar de usuarios
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
        },
        {
          email: "test.hopper@systers.xyz",
          password:
            "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
          roles: {
            waiter: true,
          },
          id: 3,
        },
      ])
    );
  }),
  rest.delete("http://localhost:8080/users/3", (_req, res, ctx) => {
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
        },
      ])
    );
  }),
  rest.patch("http://localhost:8080/users/2", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          email: "grace2.hopper@systers.xyz",
          password:
            "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
          roles: {
            admin: true,
          },
          id: 2,
        },
      ])
    );
  })
);

// limpieza mock de servidor
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test de respuesta deleteUserPetition
test("response of deleteUserPetition", async () => {
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
    },
  ];

  const usersTestResult = await deleteUserPetition(3, activeSessionToken);
  expect(usersTestResult).toEqual(usersList);
});

// test de render inicial
test("initial render employee list", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Employees />
    </Router>
  );

  const deleteUserBtn = await screen.findByTestId("3-delete");
  fireEvent.click(deleteUserBtn);
});

// evento de boton para eliminar usuario
test("delete user event", async () => {
  server.use(
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
          },
        ])
      );
    })
  );

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Employees />
    </Router>
  );

  await waitFor(() => {
    const screenAfterDelete = screen.getByTestId("employee-id");
    expect(screenAfterDelete.textContent).toBe("id: 2.");
  });
});

// test de respuesta updateUserPetition
test("response of updateUserPetition", async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let usersList = [
    {
      email: "grace2.hopper@systers.xyz",
      password: "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
      roles: {
        admin: true,
      },
      id: 2,
    },
  ];

  const usersTestResult = await updateUserPetition(
    2,
    activeSessionToken,
    usersList[0]
  );
  expect(usersTestResult).toEqual(usersList);
});

// test de segundo render
test("second render employee list", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Employees />
    </Router>
  );

  const editUserBtn = await screen.findByTestId("2-edit");
  fireEvent.click(editUserBtn);
  
  // const saveBtn = await screen.findByTestId("2-save");
  
  const userEditInput = screen.getByDisplayValue("grace.hopper@systers.xyz");
  fireEvent.change(userEditInput, {
    target: { value: "grace2.hopper@systers.xyz" },
  });
  
  //fireEvent.click(saveBtn);
  // const screenAfterSave = screen.getByTestId("2-emailSave");
  // expect(screenAfterSave.textContent).toEqual("grace2.hopper@systers.xyz");
  
  const saveBtn = await screen.findByTestId("2-save");
  expect(saveBtn.textContent).toBe("GUARDAR");
  fireEvent.click(saveBtn);
});

// evento de boton para edicion de usuario
test("edit user event", async () => {
  server.use(
    rest.get("http://localhost:8080/users", (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            email: "grace2.hopper@systers.xyz",
            password:
              "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
            roles: {
              admin: true,
            },
            id: 2,
          },
        ])
      );
    })
  );
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Employees />
    </Router>
  );

  const screenAfterSave = await screen.findByTestId("2-emailSaved");
  expect(screenAfterSave.value).toBe("grace2.hopper@systers.xyz");
});
