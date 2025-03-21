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
        showSizeChanger
        pageSizeOptions={['10', '20', '50', '100']}
        defaultCurrent={1}
        defaultPageSize={10}
        showTotal={(total) => `Total ${total} usuários`}
        locale={{ items_per_page: '/pág' }}
      />
    </PaginationContainer>
  );
};
