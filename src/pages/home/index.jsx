import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Layout, Spin } from 'antd';
import styled from 'styled-components';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { UsersTable } from '../../components/UsersTable';
import { CustomPagination } from '../../components/CustomPagination';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f9fa;
`;

const ContentContainer = styled(Content)`
  flex: 1;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ListName = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  font-family: 'Sora', sans-serif;
`;

const fetchUsers = async () => {
  const response = await axios.get('/users?page=2');
  return response.data;
};

export const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  if (isLoading) {
    return (
      <StyledLayout>
        <Header />
        <ContentContainer>
          <Spin tip="Carregando usuários..." />
        </ContentContainer>
      </StyledLayout>
    );
  }

  if (error) {
    return (
      <StyledLayout>
        <Header />
        <ContentContainer>
          <p>Ocorreu um erro ao carregar os dados.</p>
        </ContentContainer>
      </StyledLayout>
    );
  }

  const allUsers = data?.data || [];

  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <StyledLayout>
      <Header />
      <ContentContainer>
        <ListName>Usuários</ListName>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
        <UsersTable users={paginatedUsers} />
        <CustomPagination
          currentPage={currentPage}
          pageSize={pageSize}
          total={filteredUsers.length}
          onChangePage={handlePageChange}
        />
      </ContentContainer>
    </StyledLayout>
  );
};
