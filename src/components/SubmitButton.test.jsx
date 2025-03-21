import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';
import { SubmitButton } from './SubmitButton';

describe('SubmitButton Component', () => {
  it('deve renderizar corretamente', () => {
    render(<SubmitButton />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = render(<SubmitButton />);
    expect(container).toMatchSnapshot();
  });

  it('deve enviar o formulário ao clicar no botão', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <SubmitButton />
      </form>,
    );

    const button = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
