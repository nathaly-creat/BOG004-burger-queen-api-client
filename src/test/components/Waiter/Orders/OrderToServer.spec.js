import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  totalOrdersFetch,
  statusDeliveredFetch,
} from '../../../../api/petitionsFetch.js';
import { Orders } from '../../../../components/Waiter/Orders/Orders.js';

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

// mock de servidor para peticiones de ordenes realizadas.
const server = setupServer(
  rest.get('http://localhost:8080/orders', (_req, res, ctx) => {
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
          status: 'delivering',
          dateEntry: '2022-06-06 18:14:08',
          totalPrice: 10000,
          id: 1,
        },
      ])
    );
  }),
  rest.patch('http://localhost:8080/orders/1', (_req, res, ctx) => {
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
          status: 'delivered',
          dateEntry: '2022-06-06 18:14:08',
          totalPrice: 10000,
          dateProcessed: '2022-06-06 18:19:08',
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

//test para peticion de ordenes.
test('response of Orders petition delivering', async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let orderListTest = [
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
      status: 'delivering',
      dateEntry: '2022-06-06 18:14:08',
      totalPrice: 10000,
      id: 1,
    },
  ];

  const orderTestResult = await totalOrdersFetch(activeSessionToken);
  expect(orderTestResult).toEqual(orderListTest);
});

test('Changes Status to Delivered', async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let orderStatusChanged = [
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
      status: 'delivered',
      dateEntry: '2022-06-06 18:14:08',
      totalPrice: 10000,
      dateProcessed: '2022-06-06 18:19:08',
      id: 1,
    },
  ];

  const statusChangesResult = await statusDeliveredFetch(
    1,
    activeSessionToken,
    '2022-06-06 18:19:08'
  );
  expect(statusChangesResult).toEqual(orderStatusChanged);
});

//Test para visualizar ordenes en el componente.
test('Print of orders delivering in Orders component', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Orders />
    </Router>
  );

  const deliveredButton = await screen.findByText('Entregar pedido');
  expect(deliveredButton.textContent).toEqual('Entregar pedido');
  fireEvent.click(deliveredButton);
});

// Test de confirmación de entrega del pedido al cliente por mesero.
test('Component after delivered button event', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Orders />
    </Router>
  );

  let orderDelivered;
  orderDelivered = await screen.findByTestId('orders-to-delivery');
  expect(orderDelivered.textContent).toEqual('Pedidos listos para entregar');
});
