import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { totalOrdersFetch } from '../../../../api/petitionsFetch.js';
import { DeliveredOrders } from '../../../../components/shared/DeliveredOrders/DeliveredOrders.js';

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

// mock de servidor para peticiones de ordenes realizadas
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

// test para peticion de ordenes con estatus delivered
test('response of totalOrdersFetch petition with status delivered', async () => {
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
      status: 'delivered',
      dateEntry: '2022-06-06 18:14:08',
      totalPrice: 10000,
      dateProcessed: '2022-06-06 18:19:08',
      id: 1,
    },
  ];

  const orderTestResult = await totalOrdersFetch(activeSessionToken);
  expect(orderTestResult).toEqual(orderListTest);
});

// test para visualizar todas las ordenes con estatus delivered
test('print of orders delivered in DeliveredOrders component', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <DeliveredOrders/>
    </Router>
  );

  const totalTime = await screen.findByTestId('total-time');
  expect(totalTime.textContent).toEqual('5 min');
});
