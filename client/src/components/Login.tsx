// src/components/Login.tsx
import React from 'react';
import { signInWithGoogle } from '../firebaseConfig';
import { LoginContainer, Logo, LoginBox, Title, LoginButton } from './LoginStyles';

const Login: React.FC = () => {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // Redirecionar para a página principal após o login
      window.location.href = '/schedule';
    } catch (error) {
      console.error("Erro ao fazer login com Google: ", error);
    }
  };

  return (
    <LoginContainer>
      <Logo src="/logo.png" alt="Logotipo" />
      <LoginBox>
        <LoginButton onClick={handleLogin}>Login com Google</LoginButton>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
