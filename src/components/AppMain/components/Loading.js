import React from "react";
import { styled, keyframes } from "@mui/system";
import logo from "../../logo/logo.png";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Logo = styled('div')({
  width: '100px',
  height: '100px',
  animation: `${spin} 2s linear infinite`,
  backgroundImage: `url(${logo})`,
  backgroundSize: 'cover',
});

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

export const Loading = () => {
  return (
    <LoadingContainer>
      <Logo />
    </LoadingContainer>
  );
};
