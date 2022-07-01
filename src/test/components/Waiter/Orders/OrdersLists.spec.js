import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { totalOrdersPetition } from '../../../../api/petitionsFetch.js';
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
          status: 'pending',
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

// test para peticion de ordenes pendientes
test('response of totalOrdersPetition petition with status pending', async () => {
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
      status: 'pending',
      dateEntry: '2022-06-06 18:14:08',
      totalPrice: 10000,
      id: 1,
    },
  ];

  const orderTestResult = await totalOrdersPetition(activeSessionToken);
  expect(orderTestResult).toEqual(orderListTest);
});

// test para visulizar ordenes hechas en el componente Orders
test('print of orders pending in Orders component', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Orders/>
    </Router>
  );

  const clientOrder = await screen.findByTestId('card-body-name');
  expect(clientOrder.textContent).toEqual('Cliente: Juanes');
});
