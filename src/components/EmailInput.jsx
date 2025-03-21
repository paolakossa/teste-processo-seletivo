import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'antd';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.span`
  color: #e2001b;
  font-size: 12px;
  margin-top: 4px;
`;

const ErrorIconContainer = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #e2001b;
  color: #fff;
  font-size: 8px;
`;

const ErrorIcon = () => (
  <ErrorIconContainer>
    <CloseOutlined />
  </ErrorIconContainer>
);

export const EmailInput = ({ control }) => {
  return (
    <InputContainer>
      <Label htmlFor="email">Email</Label>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: 'Insira seu email ou usuário',
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Email inválido',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              id="email"
              placeholder="Seu email ou usuário"
              {...field}
              status={error ? 'error' : undefined}
              suffix={error ? <ErrorIcon /> : null}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        )}
      />
    </InputContainer>
  );
};
