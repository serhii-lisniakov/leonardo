import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

const StyledLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colorSecondary};

  img {
    transform: scale(1);
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      filter: drop-shadow(0px 0px 30px #b2b2d2);
    }

    70% {
      transform: scale(1);
      filter: drop-shadow(0px 0px 30px #4444dd);
    }

    100% {
      transform: scale(0.95);
      filter: drop-shadow(0px 0px 30px #b2b2d2);
    }
  }
`;

export const Loader: React.FC = () => {
    return (
        <StyledLoader>
            <img src={Logo} alt={'leonardo logo'}/>
        </StyledLoader>
    )
}
