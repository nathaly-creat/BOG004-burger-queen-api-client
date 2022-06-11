import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  totalOrdersPetition,
  statusDeliveredPetition,
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

// mock de servidor para peticiones de ordenes a entregar y cambio de estado a delivered
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

// test para peticion de ordenes con estatus delivering
test('response of totalOrdersPetition petition with status delivering', async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let orderDeliveringList = [
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

  const orderTestResult = await totalOrdersPetition(activeSessionToken);
  expect(orderTestResult).toEqual(orderDeliveringList);
});

// test para cambio de estado de orden a delivered
test('change status orders to delivered', async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let orderDeliveredList = [
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

  const deliveredTestResult = await statusDeliveredPetition(
    1,
    activeSessionToken,
    '2022-06-06 18:19:08'
  );
  expect(deliveredTestResult).toEqual(orderDeliveredList);
});

// test para visulizar ordenes a entregar en el componente Orders
test('print of orders to deliver in Orders component', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Orders/>
    </Router>
  );

  const deliveredButton = await screen.findByText('Entregar pedido');
  expect(deliveredButton.textContent).toEqual('Entregar pedido');

  fireEvent.click(deliveredButton);
});

// test para visualizar resultado de evento boton Entregar pedido
test('component after delivered button event', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Orders/>
    </Router>
  );

  const orderToServerRes = await screen.findByTestId('orders-to-deliver');
  expect(orderToServerRes.textContent).toEqual('Pedidos listos para entregar');
});
