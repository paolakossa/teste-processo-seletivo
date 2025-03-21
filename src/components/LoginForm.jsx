import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { SubmitButton } from './SubmitButton';

const StyledForm = styled.form`
  max-width: 600px;
  width: 100%;
  padding: 1rem;
`;

export const LoginForm = ({ onSubmit, reduxError }) => {
  const { handleSubmit, control, setError } = useForm();

  useEffect(() => {
    if (reduxError) {
      setError('email', {
        type: 'manual',
        message: reduxError,
      });

      setError('password', {
        type: 'manual',
        message: reduxError,
      });
    }
  }, [reduxError, setError]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <EmailInput control={control} />
      <PasswordInput control={control} />
      <SubmitButton />
    </StyledForm>
  );
};
