import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import { productFetch } from '../../../../api/petitionsFetch.js';
import { NewOrder } from '../../../../components/Waiter/NewOrder/NewOrder';

// mock de sessionStorage para token
sessionStorage.user = JSON.stringify({
  accessToken: 'tokenfortest',
  user: {
    email: 'mesero.hopper@systers.xyz',
    roles: {
      waiter: true,
    },
    id: 3,
  },
});

// mock de servidor para peticiones de productos
const server = setupServer(
  rest.get('http://localhost:8080/products', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 98,
          name: 'Sandwich de jamón',
          price: 10000,
          image: 'https://i.imgur.com/qgsA9QU.png',
          type: 'Desayuno',
        },
      ])
    );
  }),
  rest.get('http://localhost:8080/products/98', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 98,
          name: 'Sandwich de jamón',
          price: 10000,
          image: 'https://i.imgur.com/qgsA9QU.png',
          type: 'Desayuno',
        },
      ])
    );
  }),
  rest.post('http://localhost:8080/orders', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 3,
          client: 'Juanes',
          products: [
            {
              qty: 1,
              product: {
                id: 98,
                name: 'Sandwich de jamón',
                price: 10000,
                image: 'https://i.imgur.com/qgsA9QU.png',
                type: 'Desayuno',
                dateEntry: '2022-03-05 15:14:10',
              },
            },
          ],
          status: 'pending',
          cooked: false,
          dateEntry: '2022-06-06 18:14:08',
          totalPrice: 10000,
          id: 1,
        },
      ])
    );
  })
);

// limpieza mock de servidor
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// mock de localStorage
localStorage.getItem('react-use-cart', [
  {
    id: 98,
    name: 'Sandwich de jamón',
    price: 10000,
    image: 'https://i.imgur.com/qgsA9QU.png',
    type: 'Desayuno',
    itemTotal: 10000,
    quantity: 1,
  },
]);

// test de peticion de productos
test('response of products petition', async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let productListTest = [
    {
      id: 98,
      name: 'Sandwich de jamón',
      price: 10000,
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

  const titleProduct = await screen.findByText('Sandwich de jamón');
  expect(titleProduct.textContent).toEqual('Sandwich de jamón');

  const addProduct = screen.getByText('Agregar');
  fireEvent.click(addProduct);
});

test('agregar productos al LocaStorage', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <NewOrder />
    </Router>
  );
  let orderSuccess;
  const nameCustomer = screen.getByPlaceholderText('Nombre del cliente');
  const productosTotalOrder = screen.getByText('Ordenar');

  fireEvent.change(nameCustomer, { target: { value: 'Juanes' } });
  fireEvent.click(productosTotalOrder);

  orderSuccess = await screen.findByTestId('order-success-notification');
  expect(orderSuccess.textContent).toBe('Orden creada con éxito');
});
