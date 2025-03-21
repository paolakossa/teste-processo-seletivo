import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UsersTable } from './UsersTable';

const mockUsers = [
  {
    id: 1,
    first_name: 'Maria',
    last_name: 'Silva',
    email: 'maria@example.com',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 2,
    first_name: 'João',
    last_name: 'Oliveira',
    email: 'joao@example.com',
    avatar: 'https://via.placeholder.com/40',
  },
];

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('UsersTable Component', () => {
  it('deve renderizar corretamente com dados', () => {
    renderWithRouter(<UsersTable users={mockUsers} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome completo')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();

    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    expect(screen.getByText('João Oliveira')).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = renderWithRouter(<UsersTable users={mockUsers} />);
    expect(container).toMatchSnapshot();
  });

  it('deve renderizar "Mais detalhes" para cada usuário', () => {
    renderWithRouter(<UsersTable users={mockUsers} />);
    const links = screen.getAllByText('Mais detalhes');
    expect(links.length).toBe(mockUsers.length);
  });
});
