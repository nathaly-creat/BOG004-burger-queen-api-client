// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import { render, fireEvent, screen } from "@testing-library/react";
// import { OrderContainer } from "../../../../components/Waiter/NewOrder/OrderContainer.js";
// import { createMemoryHistory } from "history";
// import { Router } from "react-router-dom";
// import { onlyProductFetch } from "../../../../api/petitionsFetch.js";

// sessionStorage.user = JSON.stringify({
//   accessToken: "tokenfortest",
// });

// const server = setupServer(
//   rest.get("http://localhost:8080/products/3", (_req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           id: 3,
//           name: "Papas",
//           price: 800,
//           image: "https://i.imgur.com/pKoiz7T.png",
//           type: "Almuerzo",
//         },
//       ])
//     );
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// it("response of products to orderContainer", async () => {
//   const activeSession = JSON.parse(sessionStorage.user);
//   const activeSessionToken = activeSession.accessToken;
//   let productListTest = [
//     {
//       id: 3,
//       name: "Papas",
//       price: 800,
//       image: "https://i.imgur.com/pKoiz7T.png",
//       type: "Almuerzo",
//     },
//   ];

//   const onlyProductTestResult = await onlyProductFetch(activeSessionToken, 3);
//   expect(onlyProductTestResult).toEqual(productListTest);
// });


// localStorage.setItem(
//     "react-use-cart",
//     '[{id: 16, name: "Papas", price: 800, image: "https://i.imgur.com/pKoiz7T.png", type: "Almuerzo", itemTotal: 800, quantity: 1}]'
//   );
// it("localStorage", async () => {
//   let total = localStorage.getItem("react-use-cart");
//   console.log('total',total);

//   const history = createMemoryHistory();
//   render(
//     <Router location={history.location} navigator={history}>
//       <OrderContainer activeSession={'tokenfortest'}/>
//     </Router>
//   );
//   const nameInput = screen.getByPlaceholderText('Nombre del cliente');
//   fireEvent.change(nameInput, {
//     target: { value: 'Ana' },
//   });
//   const btnOrder = screen.getByText('Ordenar');
//   fireEvent.click(btnOrder);


//   const titleProduct = await screen.findByText("Papas");
//   expect(titleProduct.textContent).toEqual("Papas");
// });

// it('Order to OrderContainer', async () => {

//     {
//     "id": 2,
//     "name": "Café americano",
//     "price": 500,
//     "image": "https://i.imgur.com/EJkIF0e.png",
//     "type": "Desayuno",
//   },
//   {
//     id: 3,
//     name: 'Papas',
//     price: 800,
//     image: 'https://i.imgur.com/pKoiz7T.png',
//     type: 'Almuerzo',
//   },
