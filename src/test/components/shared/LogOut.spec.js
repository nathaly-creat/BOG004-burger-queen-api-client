
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { LogOut} from '../../../../src/components/shared/LogOut.js';

// test caso positivo de login
test('login in waiter page', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => jest.fn(),
    }));
  
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <LogOut />
      </Router>
    );
  
    const logOutButton= await screen.findByTestId('logout-btn');
    fireEvent.click(logOutButton);
  
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });