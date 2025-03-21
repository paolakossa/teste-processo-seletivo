import React from 'react';
import { Table, Avatar, Button, Space } from 'antd';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 1rem;
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
      render: (record) => (
        <Space>
          <Avatar src={record.avatar} />
          {record.first_name} {record.last_name}
        </Space>
      ),
      width: '30%',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: () => <Button type="link">Mais detalhes</Button>,
      width: '20%',
    },
  ];

  return (
    <TableContainer>
      <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
    </TableContainer>
  );
};
