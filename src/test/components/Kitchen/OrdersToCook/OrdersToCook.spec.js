import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, render, screen } from '@testing-library/react';
import { OrdersToCook } from '../../../../components/Kitchen/OrdersToCook/OrdersToCook.js';
import {
  totalOrdersPetition,
  statusDeliveringPetition,
} from '../../../../api/petitionsFetch.js';

// mock de sessionStorage para token
sessionStorage.user = JSON.stringify({
  accessToken: 'tokenfortestKitchen',
  user: {
    email: 'chef.hopper@systers.xyz',
    roles: {
      chef: true,
    },
    id: 4,
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
          status: 'delivering',
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

// test para peticion de ordenes recibidas a cocinar
test('response of totalOrdersPetition petition with status pending to cook', async () => {
  const activeSession = JSON.parse(sessionStorage.user);
  const activeSessionToken = activeSession.accessToken;

  let orderPendingListTest = [
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
  expect(orderTestResult).toEqual(orderPendingListTest);
});

// test para visualizar ordenes en el componente
test('print of orders pending in OrdersToCook component', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <OrdersToCook/>
    </Router>
  );

  const orderToCook = await screen.findByTestId('date-entry');
  expect(orderToCook.textContent).toEqual('Hora orden: 2022-06-06 18:14:08');

  const orderDeliveringButton = screen.getByText('Preparado');
  fireEvent.click(orderDeliveringButton);
});

// test para cambio de estado de orden a delivering
test('change status orders to delivering', async () => {
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

  const deliveringTestResult = await statusDeliveringPetition(
    1,
    activeSessionToken
  );
  expect(deliveringTestResult).toEqual(orderDeliveringList);
});

// test para visualizar resultado de evento boton ¿Pedido Listo?
test('component after delivering button event', async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <OrdersToCook/>
    </Router>
  );

  const componentOrdersToCookRes = await screen.findByTestId('oders-to-cook-component');
  expect(componentOrdersToCookRes.textContent).toEqual('');
});
