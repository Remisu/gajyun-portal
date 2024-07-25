import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, auth, db } from '../firebaseConfig';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { LoginContainer, Logo, LoginBox, Title, LoginButton, ErrorMessage } from './LoginStyles';

const Login: React.FC = () => {
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
    <LoginContainer>
      <Logo src="/logo.png" alt="Logo" />
      <LoginBox>
        <Title>Login</Title>
        <LoginButton onClick={handleLogin}>Sign in with Google</LoginButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;