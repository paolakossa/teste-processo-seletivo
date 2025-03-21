import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import { Auth } from './index';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userDataReducer, { loginStart } from '../../store/auth/authSlice';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderAuth = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      userData: userDataReducer,
    },
    preloadedState,
  });

  store.dispatch = vi.fn();

  const utils = render(
    <Provider store={store}>
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    </Provider>,
  );

  return { ...utils, store };
};

describe('Auth Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o formulário de login', () => {
    renderAuth({
      userData: {
        token: null,
        error: null,
      },
    });

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = renderAuth({
      userData: {
        token: null,
        error: null,
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('deve despachar loginStart ao enviar o formulário com dados válidos', async () => {
    const { store } = renderAuth({
      userData: {
        token: null,
        error: null,
      },
    });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        loginStart({
          email: 'teste@email.com',
          password: '123456',
        }),
      );
    });
  });

  it('deve redirecionar se houver token no estado', () => {
    renderAuth({
      userData: {
        token: 'fake-token',
        error: null,
      },
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
