import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'antd';
import styled from 'styled-components';
import { CloseOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

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

const PasswordIconContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledEyeInvisibleOutlined = styled(EyeInvisibleOutlined)`
  color: #666666;
`;

export const PasswordInput = ({ control }) => {
  return (
    <InputContainer>
      <Label htmlFor="password">Senha</Label>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'Insira sua senha' }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input.Password
              id="password"
              placeholder="Sua senha"
              {...field}
              status={error ? 'error' : undefined}
              iconRender={(visible) => (
                <PasswordIconContainer>
                  {visible ? <EyeTwoTone /> : <StyledEyeInvisibleOutlined />}
                  {error ? <ErrorIcon /> : null}
                </PasswordIconContainer>
              )}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        )}
      />
    </InputContainer>
  );
};
