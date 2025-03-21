import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { logout } from '../store/auth/authSlice';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 1rem;
  border-bottom: 1px solid #ddd;
  height: 64px;
`;

const CompanyName = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const Header = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userData.email);

  const menu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: 'Sair',
          onClick: () => dispatch(logout()),
        },
      ]}
    />
  );

  return (
    <HeaderContainer>
      <CompanyName>ITA Frotas</CompanyName>
      <Dropdown overlay={menu} trigger={['click']}>
        <UserContainer>
          <span>{email}</span>
          <DownOutlined />
        </UserContainer>
      </Dropdown>
    </HeaderContainer>
  );
};
