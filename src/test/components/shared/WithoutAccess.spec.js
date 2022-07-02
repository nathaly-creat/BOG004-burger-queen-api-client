import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { WithoutAccess } from '../../../../src/components/shared/WithoutAccess.js';

// test de vista WithoutAccess
test('login in kitchen page', async () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <WithoutAccess/>
    </Router>
  );

  const withoutAccessComponent = await screen.findByTestId('without-access');
  expect(withoutAccessComponent.textContent.trim()).toBe(
    'VolverVista no existente o no tienes acceso permitido'
  );
});
