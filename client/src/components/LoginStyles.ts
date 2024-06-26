// src/components/LoginStyles.ts
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

export const Logo = styled.img`
  width: 450px;
  margin-bottom: 20px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ae8;
  }
`;
