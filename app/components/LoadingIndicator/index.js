import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';
import { ClimbingBoxLoader } from 'react-spinners';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

export default () => (
  <LoaderWrapper>
    <ClimbingBoxLoader size={25} color="#00a9a5" />
  </LoaderWrapper>
);
