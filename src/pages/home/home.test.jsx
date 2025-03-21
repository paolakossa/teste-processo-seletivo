import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import axios from 'axios';
import { Home } from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from '../../store/auth/authSlice';

vi.mock('axios');

const createTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      userData: userDataReducer,
    },
    preloadedState,
  });

const renderHome = (state = { userData: { token: 'fake-token', email: 'teste@email.com' } }) => {
  const store = createTestStore(state);
  const queryClient = new QueryClient();

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </MemoryRouter>
    </Provider>,
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve mostrar o spinner de carregamento', async () => {
    axios.get.mockReturnValue(new Promise(() => {}));
    renderHome();

    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('deve exibir usuários após carregamento', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: 1,
            first_name: 'Maria',
            last_name: 'Silva',
            email: 'maria@email.com',
            avatar: 'https://via.placeholder.com/40',
          },
        ],
      },
    });

    renderHome();

    const userName = await screen.findByText(/Maria Silva/i);
    expect(userName).toBeInTheDocument();
    expect(screen.getByText(/maria@email.com/i)).toBeInTheDocument();
  });

  it('deve bater com snapshot', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: 1,
            first_name: 'Maria',
            last_name: 'Silva',
            email: 'maria@email.com',
            avatar: 'https://via.placeholder.com/40',
          },
        ],
      },
    });

    const { container } = renderHome();
    await screen.findByText(/Maria Silva/i);
    expect(container).toMatchSnapshot();
  });
});
