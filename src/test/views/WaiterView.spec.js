import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { WaiterView } from '../../views/WaiterView.js';

// test cambio de ruta en el componente waiter
test('login in waiter page', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => jest.fn(),
    }));
  
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <WaiterView />
      </Router>
    );

    const navOrdersButton= await screen.findByTestId('nav-waiter-orders');
    fireEvent.click(navOrdersButton);
  
    await waitFor(() => {
      expect(history.location.pathname).toBe('/waiter/orders');
    });
  });