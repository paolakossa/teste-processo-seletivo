import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';
import { CustomPagination } from './CustomPagination';

describe('CustomPagination Component', () => {
  const setup = () => {
    const onChangePageMock = vi.fn();
    render(
      <CustomPagination currentPage={1} pageSize={10} total={85} onChangePage={onChangePageMock} />,
    );
    return { onChangePageMock };
  };

  it('deve renderizar corretamente', () => {
    setup();
    expect(screen.getByText('Total 85 usuários')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('/pág'))).toBeInTheDocument();
  });

  it('deve corresponder ao snapshot', () => {
    const { container } = render(
      <CustomPagination currentPage={1} pageSize={10} total={85} onChangePage={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('deve chamar onChangePage ao clicar em um número da paginação', () => {
    const { onChangePageMock } = setup();

    const pageTwoButton = screen.getByRole('listitem', { name: '2' }).querySelector('a');
    fireEvent.click(pageTwoButton);

    expect(onChangePageMock).toHaveBeenCalledTimes(1);
    expect(onChangePageMock).toHaveBeenCalledWith(2, expect.any(Number));
  });

  it('deve chamar onChangePage ao clicar no próximo botão', () => {
    const { onChangePageMock } = setup();

    const nextButton = screen.getByTitle('Next Page');
    fireEvent.click(nextButton);

    expect(onChangePageMock).toHaveBeenCalledTimes(1);
    expect(onChangePageMock).toHaveBeenCalledWith(2, expect.any(Number));
  });

  it('deve chamar onChangePage ao alterar o tamanho da página', () => {
    const { onChangePageMock } = setup();

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('20 /pág'));

    expect(onChangePageMock).toHaveBeenCalledTimes(1);
    expect(onChangePageMock).toHaveBeenCalledWith(1, 20);
  });
});
