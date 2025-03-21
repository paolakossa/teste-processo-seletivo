import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { useForm } from 'react-hook-form';
import { PasswordInput } from './PasswordInput';

const renderWithForm = () => {
  const Wrapper = () => {
    const { control, handleSubmit } = useForm();
    return (
      <form onSubmit={handleSubmit(() => {})}>
        <PasswordInput control={control} />
        <button type="submit">Enviar</button>
      </form>
    );
  };

  return render(<Wrapper />);
};

describe('PasswordInput Component', () => {
  it('deve renderizar corretamente', () => {
    renderWithForm();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sua senha')).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = renderWithForm();
    expect(container).toMatchSnapshot();
  });

  it('deve exibir mensagem de erro ao submeter sem preencher a senha', async () => {
    renderWithForm();
    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(screen.getByText('Insira sua senha')).toBeInTheDocument();
    });
  });

  it('deve remover mensagem de erro ao digitar senha válida', async () => {
    renderWithForm();
    const input = screen.getByPlaceholderText('Sua senha');

    fireEvent.click(screen.getByText('Enviar'));
    await waitFor(() => {
      expect(screen.getByText('Insira sua senha')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(screen.queryByText('Insira sua senha')).not.toBeInTheDocument();
    });
  });
});
