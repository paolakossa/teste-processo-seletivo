import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('deve renderizar corretamente', () => {
    render(<SearchBar searchTerm="" onSearchChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('Pesquise nome ou documento')).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = render(<SearchBar searchTerm="" onSearchChange={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('deve chamar onSearchChange ao digitar no input', () => {
    const onSearchChangeMock = vi.fn();
    render(<SearchBar searchTerm="" onSearchChange={onSearchChangeMock} />);

    const input = screen.getByPlaceholderText('Pesquise nome ou documento');
    fireEvent.change(input, { target: { value: 'Teste' } });

    expect(onSearchChangeMock).toHaveBeenCalledWith('Teste');
  });

  it('deve chamar onSearchChange ao clicar no botão de busca', () => {
    const onSearchChangeMock = vi.fn();
    render(<SearchBar searchTerm="Documento" onSearchChange={onSearchChangeMock} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onSearchChangeMock).toHaveBeenCalledWith('Documento');
  });
});
