import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { KitchenView } from '../../views/KitchenView.js';

// test de cambio de ruta en el componente Kitchen
test('login in kitchen page', async () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <KitchenView />
    </Router>
  );

  const navOrdersDeliveredButton = await screen.findByTestId(
    'nav-kitchen-delivered-orders'
  );
  fireEvent.click(navOrdersDeliveredButton);

  await waitFor(() => {
    expect(history.location.pathname).toBe('/kitchen/delivered-orders');
  });
});
