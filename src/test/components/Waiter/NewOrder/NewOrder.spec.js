import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { productFetch } from '../../../../api/petitionsFetch.js';
import { NewOrder } from '../../../../components/Waiter/NewOrder/NewOrder';

// mock de sessionStorage para token
sessionStorage.user = JSON.stringify({
  accessToken: 'tokenfortest',
});

// mock de servidor para peticiones de productos
const server = setupServer(
  rest.get('http://localhost:8080/products', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Sandwich de jamón y queso',
          price: 1000,
          image: 'https://i.imgur.com/qgsA9QU.png',
          type: 'Desayuno',
        },
      ])
    );
  })
);

// limpieza mock de servidor
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test de peticion de productos
test('response of products petition', async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let productListTest = [
    {
      id: 1,
      name: 'Sandwich de jamón y queso',
      price: 1000,
      image: 'https://i.imgur.com/qgsA9QU.png',
      type: 'Desayuno',
    },
  ];

  const productTestResult = await productFetch(activeSessionToken);
  expect(productTestResult).toEqual(productListTest);
});

// test de visualizacion de productos en componente NewOrder
test('print of products in NewOrder component', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <NewOrder />
    </Router>
  );

  const titleProduct = await screen.findByText('Sandwich de jamón y queso');
  expect(titleProduct.textContent).toEqual('Sandwich de jamón y queso');
});
