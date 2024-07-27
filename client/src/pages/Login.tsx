import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, auth, db } from '../firebaseConfig';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Button, Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Background = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#ffffff',
});

const Logo = styled('img')({
  width: '30vw',
  maxWidth: '300px',
  marginBottom: '40px',
});

const LoginButton = styled(Button)({
  backgroundColor: '#4285f4',
  color: 'white',
  padding: '10px 20px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#357ae8',
  },
});

const ErrorMessage = styled(Typography)({
  color: 'red',
  marginTop: '20px',
});

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const email = result.user.email;

      if (email) {
        // Verificar se o email está na coleção 'employees'
        const q = query(collection(db, 'employees'), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Acesso negado. E-mail não registrado.');
          // Deslogar o usuário se o e-mail não estiver registrado
          await signOut(auth);
        } else {
          // Permitir login e redirecionar
          navigate('/schedule-management');
          setError(null); // Limpar qualquer erro anterior
        }
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro no login. Tente novamente.');
    }
  };

  return (
    <Background>
      <Container maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo src="/logo.png" alt="Logo" />
          <LoginButton variant="contained" onClick={handleLogin}>
            Sign in with Google
          </LoginButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
      </Container>
    </Background>
  );
};

export default Login;