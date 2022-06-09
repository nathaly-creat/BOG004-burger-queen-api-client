// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// // import userEvent from '@testing-library/user-event'
// // import { rest } from 'msw';
// // import { setupServer } from 'msw/node';
// import { render, screen } from '@testing-library/react';
// import { AppRouter } from '../../routers/AppRouter.js';

// // mock de sessionStorage para token
// sessionStorage.user = JSON.stringify({
//   accessToken: 'tokenfortest',
//   user: {
//     email: 'mesero.hopper@systers.xyz',
//     roles: {
//       waiter: true,
//     },
//     id: 3,
//   },
// });

// test('Change view waiter', async () => {
//     // jest.mock('react-router-dom', () => ({
//     //   ...jest.requireActual('react-router-dom'),
//     //   useNavigate: () => jest.fn(),
//     // }));

//     const history = createMemoryHistory();
//     const route = '/login'
//     history.push(route)
//     render(
//       <Router location={history.location} navigator={history}>
//         <AppRouter />
//       </Router>
//     );
//     expect(screen.getByTestId('change-views-roles')).toHaveTextContent(route);
//     // const user = userEvent.setup();
//     // expect(history.location.pathname).toBe('/waiter')

//     // const rolesChanger= await screen.findByTestId('change-views-roles');
//     // // fireEvent.click(navOrdersDeliveredButton);

//     // await waitFor(() => {
//     //   expect(rolesChanger).toBe('/waiter');
//     // });
//   });
