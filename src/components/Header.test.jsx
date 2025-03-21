import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { expect, describe, it, vi } from 'vitest';

import { Header } from './Header';
import authReducer, { logout } from '../store/auth/authSlice';

const renderWithStore = (preloadedState = { userData: { email: 'usuario@teste.com' } }) => {
  const store = configureStore({
    reducer: { userData: authReducer },
    preloadedState,
  });

  const spy = vi.spyOn(store, 'dispatch');

  render(
    <Provider store={store}>
      <Header />
    </Provider>,
  );

  return { store, spy };
};

describe('Header Component', () => {
  it('deve renderizar corretamente', () => {
    renderWithStore();
    expect(screen.getByText('ITA Frotas')).toBeInTheDocument();
  });

  it('deve exibir o email do usuário', () => {
    renderWithStore({ userData: { email: 'teste@email.com' } });
    expect(screen.getByText('teste@email.com')).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = renderWithStore();
    expect(container).toMatchSnapshot();
  });

  it('deve disparar logout ao clicar em "Sair"', () => {
    const { spy } = renderWithStore();

    fireEvent.click(screen.getByText('usuario@teste.com'));

    const logoutOption = screen.getByText('Sair');
    fireEvent.click(logoutOption);

    expect(spy).toHaveBeenCalledWith(logout());
  });
});
