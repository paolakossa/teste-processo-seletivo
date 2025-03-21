import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const CustomPagination = ({ currentPage, pageSize, total, onChangePage }) => {
  return (
    <PaginationContainer>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onChangePage}
        showSizeChanger={false}
      />
    </PaginationContainer>
  );
};
