import React from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Importar todas as imagens da pasta src/images
const importAll = (r: any) => r.keys().map(r);
const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
const woodTexture = require('../images/textures/wood-texture-close.jpg');
const goldTexture = require('../images/textures/gold-textured-background.jpg');

// Selecionar uma imagem aleatória
const randomImage = images[Math.floor(Math.random() * images.length)];

// Estilo global para importar a fonte Noto Serif JP
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
`;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: fixed;
  padding-bottom: 60px; /* Adicionar espaço extra na parte inferior */
`;

const EmployeeFrame = styled.div`
  width: 100%;
  height: 20%;
  background-image: url(${woodTexture});
  background-size: cover;
  border: 2px solid #2E1A00; /* Marrom mais escuro */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 40px; /* Aumentar o espaço entre a placa de ouro e os itens da lista */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const FrameImage = styled.img`
  width: 100%;
  height: 85%;
  object-fit: contain; /* Ajustar a imagem sem cortar */
  border-radius: 10px;
  margin-bottom: 10px;
`;

const GoldPlaque = styled.div`
  width: 90%;
  background-image: url(${goldTexture});
  background-size: cover;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  bottom: -25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 1px solid #FFF5E1; /* Borda branca com leve amarelamento */
  border-radius: 5px;
`;

const BlackBorderContainer = styled.div`
  border: 1px solid black; /* Borda preta mais fina */
  padding: 2px;
  background: url(${goldTexture});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotate(180deg); /* Girar a textura de ouro em 180 graus */
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaqueText = styled.div`
  color: black;
  font-family: 'MS Mincho', serif; /* Fonte especial para o texto da placa de ouro */
  text-transform: uppercase;
  font-size: 16px; /* Aumentar o tamanho da fonte */
  font-weight: bold;
  transform: rotate(-180deg); /* Desfazer a rotação do texto */
`;

const SidebarButton = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 15px 0;
  font-size: 18px;
  width: 80%;
  padding: 10px 20px;
  text-align: center;
  background-color: #444;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #555;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const LogoutButton = styled.button`
  color: white;
  background-color: #f44336;
  border: none;
  padding: 10px;
  margin-top: auto;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 40px; /* Aumentar a margem inferior para evitar corte */
  border-radius: 5px;
  cursor: pointer;
  width: 80%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #d32f2f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <GlobalStyle />
      <EmployeeFrame>
        <FrameImage src={randomImage} alt="Employee of the Month" />
        <GoldPlaque>
          <BlackBorderContainer>
            <PlaqueText>Employee Of The Month</PlaqueText>
          </BlackBorderContainer>
        </GoldPlaque>
      </EmployeeFrame>
      <SidebarButton to="/work-schedule">Work Schedule</SidebarButton>
      <SidebarButton to="/schedule-management">Schedule Management</SidebarButton>
      <LogoutButton>Logout</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;