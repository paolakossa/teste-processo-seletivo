import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart } from '../../store/auth/authSlice';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import van from '../../assets/images/van.png';
import { LoginForm } from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const PrincipalImage = styled.div`
  background: url(${van}) no-repeat center center;
  background-size: cover;
  height: 100vh;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f9fa;
`;

export const Auth = () => {
  const dispatch = useDispatch();
  const { error, token } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSubmit = (userData) => {
    dispatch(loginStart(userData));
  };
  return (
    <Row>
      <Col xs={0} md={12}>
        <PrincipalImage />
      </Col>
      <Col xs={24} md={12}>
        <FormContainer>
          <LoginForm onSubmit={handleSubmit} reduxError={error} />
        </FormContainer>
      </Col>
    </Row>
  );
};
