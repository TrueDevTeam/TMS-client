import React from 'react';
import styled, { keyframes } from 'styled-components';

const skBounceDelay = keyframes`
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

const Spinner = styled.div`
  width: 70px;
  text-align: center;

  & > div {
    width: 18px;
    height: 18px;
    background-color: ${({ theme }) => theme.primary};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${skBounceDelay} 1.4s infinite ease-in-out both;
    animation: ${skBounceDelay} 1.4s infinite ease-in-out both;
  }

  & .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  & .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
`;

export const BounceSpinner = () => (
  <Spinner>
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </Spinner>
);
