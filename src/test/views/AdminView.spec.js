import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { AdminView } from '../../views/AdminView.js';

// test de cambio de ruta en el componente Admin
test('route change in admin view', async () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <AdminView/>
    </Router>
  );

  const navOrdersDeliveredButton = await screen.findByTestId(
    'nav-kitchen-delivered-orders'
  );
  fireEvent.click(navOrdersDeliveredButton);

  await waitFor(() => {
    expect(history.location.pathname).toBe('/admin/delivered-orders');
  });
});
