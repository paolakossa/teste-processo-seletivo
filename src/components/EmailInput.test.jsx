import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';
import { EmailInput } from './EmailInput';
import { useForm } from 'react-hook-form';

const renderWithForm = () => {
  const Wrapper = () => {
    const { control, handleSubmit, trigger } = useForm();
    return (
      <form onSubmit={handleSubmit(vi.fn())}>
        <EmailInput control={control} />
        <button type="submit">Enviar</button>
        <button type="button" onClick={() => trigger('email')}>
          Validar
        </button>
      </form>
    );
  };

  return render(<Wrapper />);
};

describe('EmailInput Component', () => {
  it('deve renderizar corretamente', () => {
    renderWithForm();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Seu email ou usuário')).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = renderWithForm();
    expect(container).toMatchSnapshot();
  });

  it('deve exibir mensagem de erro ao deixar o campo vazio e enviar o formulário', async () => {
    renderWithForm();

    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(screen.getByText('Insira seu email ou usuário')).toBeInTheDocument();
    });
  });

  it('deve exibir erro ao digitar um email inválido', async () => {
    renderWithForm();

    const input = screen.getByPlaceholderText('Seu email ou usuário');
    fireEvent.change(input, { target: { value: 'email-invalido' } });
    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument();
    });
  });
});
