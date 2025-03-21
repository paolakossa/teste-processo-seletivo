import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

const SearchContainer = styled.div`
  margin: 1rem 0;
  width: 328px;
`;

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <SearchContainer>
      <Search
        placeholder="Pesquise nome ou documento"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onSearch={(value) => onSearchChange(value)}
        enterButton
      />
    </SearchContainer>
  );
};
