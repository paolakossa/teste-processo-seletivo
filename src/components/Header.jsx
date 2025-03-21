import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { logout } from '../store/auth/authSlice';

const HeaderContainer = styled.header`
  width: 100%;
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

const RotatingIcon = styled(DownOutlined)`
  transition: transform 0.3s ease-in-out;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg);'}
`;

export const Header = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userData.email);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <Dropdown overlay={menu} trigger={['click']} onOpenChange={(open) => setMenuOpen(open)}>
        <UserContainer>
          <span>{email}</span>
          <RotatingIcon isOpen={menuOpen} />
        </UserContainer>
      </Dropdown>
    </HeaderContainer>
  );
};
