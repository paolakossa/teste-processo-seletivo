import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 100%;
`;

export const SubmitButton = () => {
  return (
    <StyledButton type="primary" htmlType="submit">
      Entrar
    </StyledButton>
  );
};
