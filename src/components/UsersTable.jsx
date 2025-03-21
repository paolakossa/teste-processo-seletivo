import React from 'react';
import { Table, Avatar, Space } from 'antd';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 1rem;
  overflow-x: auto;
`;

export const StyledTable = styled(Table)`
  width: 100%;

  .ant-table {
    width: 100%;
    min-width: 600px;
  }

  .ant-table-thead > tr > th {
    border: none !important;
    border-bottom: 1px solid #d9d9d9 !important;
  }

  .ant-table-thead > tr > th::before,
  .ant-table-thead > tr > th::after {
    display: none !important;
    content: none !important;
  }

  .ant-table-column-sorters {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  .ant-table-thead > tr > th.gray-bg {
    background-color: #f0f0f0 !important;
  }

  .ant-table-thead > tr > th.gray-bg:hover,
  .ant-table-thead > tr > th.gray-bg.ant-table-column-sort {
    background-color: #f0f0f0 !important;
  }

  @media (max-width: 768px) {
    .ant-table-thead > tr > th {
      font-size: 14px;
      padding: 8px;
    }
  }
`;

export const UsersTable = ({ users }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Nome completo',
      key: 'name',
      sorter: (a, b) => {
        const nameA = (a.first_name + ' ' + a.last_name).toLowerCase();
        const nameB = (b.first_name + ' ' + b.last_name).toLowerCase();
        return nameA.localeCompare(nameB);
      },
      className: 'gray-bg',
      render: (record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span>
            {record.first_name} {record.last_name}
          </span>
        </Space>
      ),
      width: '30%',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
      sorter: (a, b) => a.email.localeCompare(b.email),
      className: 'gray-bg',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: () => <a href="#">Mais detalhes</a>,
      width: '20%',
    },
  ];

  return (
    <TableContainer>
      <StyledTable dataSource={users} columns={columns} rowKey="id" pagination={false} />
    </TableContainer>
  );
};
