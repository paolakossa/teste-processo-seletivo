import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm Component', () => {
  const setup = (reduxError = null) => {
    const mockOnSubmit = vi.fn();
    render(<LoginForm onSubmit={mockOnSubmit} reduxError={reduxError} />);
    return { mockOnSubmit };
  };

  it('deve renderizar corretamente', () => {
    setup();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = render(<LoginForm onSubmit={vi.fn()} reduxError={null} />);
    expect(container).toMatchSnapshot();
  });

  it('deve exibir erro de validação ao submeter sem preencher campos', async () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText('Insira seu email ou usuário')).toBeInTheDocument();
      expect(screen.getByText('Insira sua senha')).toBeInTheDocument();
    });
  });

  it('deve chamar onSubmit quando o formulário estiver válido', async () => {
    const { mockOnSubmit } = setup();

    fireEvent.change(screen.getByPlaceholderText('Seu email ou usuário'), {
      target: { value: 'email@teste.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Sua senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          email: 'email@teste.com',
          password: '123456',
        },
        expect.anything(),
      );
    });
  });

  it('deve exibir erro manual vindo do redux', async () => {
    setup('Usuário ou senha inválidos');

    await waitFor(() => {
      expect(screen.getAllByText('Usuário ou senha inválidos')).toHaveLength(2);
    });
  });
});
