import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ProtectedRoute } from './ProtectedRoute';

const renderWithRouterAndStore = (initialEntries, preloadedState) => {
  const store = configureStore({
    reducer: {
      userData: (state = preloadedState.userData) => state,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>Página protegida</div>
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<div>Página de login</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('ProtectedRoute Component', () => {
  it('deve renderizar os filhos quando o token estiver presente', () => {
    renderWithRouterAndStore(['/'], {
      userData: { token: 'fake-token' },
    });

    expect(screen.getByText('Página protegida')).toBeInTheDocument();
  });

  it('deve redirecionar para /auth quando o token estiver ausente', () => {
    renderWithRouterAndStore(['/'], {
      userData: { token: null },
    });

    expect(screen.getByText('Página de login')).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot quando logado', () => {
    const { container } = renderWithRouterAndStore(['/'], {
      userData: { token: 'fake-token' },
    });

    expect(container).toMatchSnapshot();
  });
});
